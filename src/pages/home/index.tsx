import React, { useRef, useState } from 'react';
import Container from '../../shared/components/container';
import { Paper, TextField, Button, CircularProgress, Grid, Link } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useJsApiLoader, GoogleMap, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import { google } from "../../shared/config"
import { polylineOptions, center, googleMapOptions } from "../../shared/utils/constant"
import "./home.css";

const Home: React.FC = () => {
    const { isLoaded } = useJsApiLoader({ 
        googleMapsApiKey: google.GOOGLE_MAPS_API_KEY!, 
        libraries: ['places'] 
    })
    const [lastFlight, setLastFlight] = useState<google.maps.Polyline>()
    const [map ,setMap] = useState<google.maps.Map>()
    const [origin ,setOrigin] = useState<google.maps.places.Autocomplete | any>(null)
    const [destination ,setDestination] = useState<google.maps.places.Autocomplete | any>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
    const [distance, setDistance] = useState<string | undefined>('')
    const toRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
    const fromRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

    const calculateRoute = async () => {
        if (toRef.current?.value === '' || fromRef.current?.value === '') return
        setIsLoading(true)
        const directionsService = new window.google.maps.DirectionsService()
        const results: google.maps.DirectionsResult = await directionsService.route({
            origin: fromRef?.current?.value!,
            destination: toRef?.current?.value!,
            travelMode: window.google.maps.TravelMode.DRIVING,
        })

        const orginLat = origin.getPlace().geometry.location.lat()
        const originLng = origin.getPlace().geometry.location.lng()
        const destinationLat = destination.getPlace().geometry.location.lat()
        const destinationLng = destination.getPlace().geometry.location.lng()

        const flightPlanCoordinates = [
            { lat: orginLat, lng:  originLng},
            { lat: destinationLat, lng: destinationLng },
        ];
        
        const flightPath = new window.google.maps.Polyline({
            path: flightPlanCoordinates,
            ...polylineOptions
        });

        // remove last flight from map
        lastFlight && lastFlight.setMap(null);
        
        setLastFlight(flightPath)
        setDirections(results)
        flightPath.setMap(map || null);
        setDistance(results?.routes[0]?.legs[0]?.distance?.text)
        map?.panTo({lat: orginLat,lng: originLng})
        setIsLoading(false)
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
                                options={googleMapOptions}
                                onLoad={(map: google.maps.Map) => setMap(map)}
                                
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
                                        <Autocomplete onLoad={(e) => setOrigin(e)} options={{ types: ['airport'], componentRestrictions: { country: "us" } }}>
                                            <TextField id="from" label="From" inputRef={fromRef} className="input" />
                                        </Autocomplete>
                                    </Grid>
                                    <Grid item lg={5} md={5} sm={5} xs={12}>
                                        <Autocomplete onLoad={(e) => setDestination(e)} options={{ types: ['airport'], componentRestrictions: { country: "us" } }}>
                                            <TextField id="to" label="To" inputRef={toRef} className="input" />
                                        </Autocomplete>
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={2} xs={12} className="hideOnMobile">
                                        <Button variant="contained" onClick={calculateRoute} className="btn">{isLoading ? <CircularProgress sx={{ color: "#FFFFFF" }} /> : <SearchIcon />}</Button>
                                    </Grid>
                                    <Grid item lg={10} md={10} sm={10} xs={12} className="details">
                                        Distance: <b>{distance}</b>
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={2} xs={6} className="hideOnDesktop">
                                        <Button variant="contained" onClick={() => window.location.reload()} className="btn">Reset</Button>
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={2} xs={6} className="hideOnDesktop">
                                        <Button variant="contained" onClick={calculateRoute} className="btn">{isLoading ? <CircularProgress sx={{ color: "#FFFFFF" }} /> : <><SearchIcon /> Search</>}</Button>
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={2} xs={12} className="hideOnMobile">
                                        <Link variant="body2" onClick={() => window.location.reload()} className="link">Reset</Link>
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