import React, { useEffect, useState } from 'react';
import Container from 'shared/components/container';
import Search from 'shared/components/search';
import Select from 'shared/components/select';
import Grid from '@mui/material/Grid';
import Card from 'shared/components/card';
import { getAllCountries } from 'modules/country/redux/operators';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, setCountry } from 'modules/country/redux/countrySlice';
import { Link } from "react-router-dom";
import { getRegions } from 'shared/utils/helper';
import "./styles.scss";

const Home: React.FC = () => {
    const dispatch: any = useDispatch()
    const allCountries = useSelector(getCountries)
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("")
    const [countries, setCountries] = useState([])

    useEffect(() => {
        const fetchCountries = async () => {
            await dispatch(getAllCountries())
        }

        fetchCountries()
    }, [])

    useEffect(() => {
        let results: any = allCountries

        if(filter && search){
            results = allCountries?.filter((c: any) => c.region == filter && (c.name.common.toLowerCase()).includes(search.toLowerCase()))
        }
        else if(filter){
            results = allCountries?.filter((c: any) => c.region == filter)
        }
        else if(search){
            results = allCountries?.filter((c: any) => (c.name.common.toLowerCase()).includes(search.toLowerCase()))
        }

        setCountries(results)
    }, [allCountries, search, filter])

    return (
        <>
            <Container>
                <Grid className="searchSection" container alignItems="center" justifyContent={"space-between"}>
                    <Grid item>
                        <Search setSearch={setSearch}/>
                    </Grid>
                    <Grid item>
                        <Select 
                            regions={getRegions(allCountries)}
                            region={filter}
                            setRegion={setFilter}
                        />
                    </Grid>
                </Grid>

                <Grid 
                    className="searchSection" 
                    container 
                    alignItems="center" 
                    spacing={5}
                >
                    {
                        countries?.map((c: any, i) => {
                            return (
                                <Grid item lg={3} xs={12} key={i}>
                                    <Link to="/details" 
                                        style={{ textDecoration: 'none' }}
                                        onClick={() => dispatch(setCountry({country: c.cca3}))}
                                    >
                                        <Card country={c}/>
                                    </Link>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </>
    );
}


export default Home;