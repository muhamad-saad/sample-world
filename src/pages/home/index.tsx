import React, { useRef, useState } from 'react';
import Container from '../../shared/components/container';
import { Paper, TextField, Button, CircularProgress, Grid, Link } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useJsApiLoader, GoogleMap, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import { google } from "../../shared/config"
import { center, UNITED_STATES_BOUNDS } from "../../shared/utils/constant"
import "./home.css";


const Home: React.FC = () => {
    const { isLoaded } = useJsApiLoader({ 
        googleMapsApiKey: google.GOOGLE_MAPS_API_KEY!, 
        libraries: ['places'] 
    })
    const [isLoading, setIsLoading] = useState(false)
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
    const [details, setDetails] = useState<{ distance: string | undefined, duration: string | undefined }>({ distance: '', duration: '' })
    const toRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
    const fromRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

    const calculateRoute = async () => {
        if (toRef.current?.value === '' || fromRef.current?.value === '') return
        setIsLoading(true)
        const directionsService = new window.google.maps.DirectionsService()
        const results: google.maps.DirectionsResult = await directionsService.route({
            origin: toRef?.current?.value!,
            destination: fromRef?.current?.value!,
            travelMode: window.google.maps.TravelMode.DRIVING,
        })
        setDirections(results)
        setDetails({ distance: results?.routes[0]?.legs[0]?.distance?.text, duration: results?.routes[0]?.legs[0]?.duration?.text })
        setIsLoading(false)
    }

    const resetRoute = () => {
        window.location.reload()
        setDirections(null)
        setDetails({ distance: '', duration: '' })
        if (toRef.current) toRef.current.value = ''
        if (fromRef.current) fromRef.current.value = ''
    }

    return (
        <>
            <Container>
                {
                    !isLoaded ?
                        <Paper elevation={3} className='loading'>
                            <CircularProgress />
                        </Paper>
                        :
                        <Paper elevation={3} className="mapContainer">
                            <GoogleMap
                                center={center}
                                zoom={1}
                                mapContainerStyle={{ width: "100%", height: "100%" }}
                                options={{
                                    restriction: {
                                        latLngBounds: UNITED_STATES_BOUNDS,
                                        strictBounds: false,
                                    },
                                    minZoom: 1,
                                    maxZoom: 6,
                                }}
                            >
                                {directions && (<DirectionsRenderer directions={directions} />)}
                            </GoogleMap>
                            <Paper elevation={3} className="searchBox" >
                                <Grid
                                    container
                                    rowSpacing={3}
                                    spacing={2}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item lg={5} md={5} sm={5} xs={12}>
                                        <Autocomplete options={{ types: ['airport'], componentRestrictions: { country: "us" } }}>
                                            <TextField id="to" label="To" inputRef={toRef} className="input" />
                                        </Autocomplete>
                                    </Grid>
                                    <Grid item lg={5} md={5} sm={5} xs={12}>
                                        <Autocomplete options={{ types: ['airport'], componentRestrictions: { country: "us" } }}>
                                            <TextField id="from" label="From" inputRef={fromRef} className="input" />
                                        </Autocomplete>
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={2} xs={12} className="hideOnMobile">
                                        <Button variant="contained" onClick={calculateRoute} className="btn">{isLoading ? <CircularProgress sx={{ color: "#FFFFFF" }} /> : <SearchIcon />}</Button>
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={2} xs={6} className="hideOnDesktop">
                                        <Button variant="contained" onClick={resetRoute} className="btn">Reset</Button>
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={2} xs={6} className="hideOnDesktop">
                                        <Button variant="contained" onClick={calculateRoute} className="btn">{isLoading ? <CircularProgress sx={{ color: "#FFFFFF" }} /> : <><SearchIcon /> Search</>}</Button>
                                    </Grid>
                                    <Grid item lg={5} md={5} sm={5} xs={6} className="details">
                                        Duration: <b>{details?.duration}</b>
                                    </Grid>
                                    <Grid item lg={5} md={5} sm={5} xs={6} className="details">
                                        Distance: <b>{details?.distance}</b>
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={2} xs={12} className="hideOnMobile">
                                        <Link variant="body2" onClick={resetRoute} className="link">Reset</Link>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Paper>
                }
            </Container>
        </>
    )
}


export default Home;