import React, { useEffect, useState } from 'react';
import Container from 'shared/components/container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import "./styles.scss";
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, getCountry, setCountry } from 'modules/country/redux/countrySlice';
import { getLanguanges, getCurrencies, getNativeName } from 'shared/utils/helper';

const Details: React.FC = () => {
    const dispatch = useDispatch()
    const countries = useSelector(getCountries)
    const country = useSelector(getCountry)
    const [details, setDetails]: any = useState(null)

    useEffect(() => {
        const results = countries?.filter((c: any) => c.cca3 == country)
        setDetails(results[0])
    }, [country])

    return (
        <>
            <Container>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button className='backBtn'> <KeyboardBackspaceIcon sx={{marginRight: 1}}/> Back</Button>
                </Link>
                <Grid container className='countryDetails'>
                    <Grid item lg={6} xs={12}>
                        <img 
                            src={details?.flags?.svg}
                            loading="lazy"
                            className='flag'
                            alt="flag"
                        />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <Grid container>
                            <Grid item lg={12}>
                                <Typography gutterBottom variant="h6" component="div" className='countryName'>
                                    {details?.name?.common}
                                </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12} >
                                <Typography variant="body2" color="text.secondary" className='paragraph'>
                                    <span className="subtitle">Native Name:</span> <span className="details">{getNativeName(details?.name?.nativeName)}</span>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='paragraph'>
                                    <span className="subtitle">Population:</span> <span className="details">{details?.population?.toLocaleString()}</span>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='paragraph'>
                                    <span className="subtitle">Region:</span> <span className="details">{details?.region}</span>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='paragraph'>
                                    <span className="subtitle">Sub Region:</span> <span className="details">{details?.subregion}</span>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='paragraph'>
                                    <span className="subtitle">Capital:</span> <span className="details">{details?.capital}</span>
                                </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12} className="moreDetails">
                                <Typography variant="body2" color="text.secondary" className='paragraph'>
                                    <span className="subtitle">Top Level Domain:</span> <span className="details">{details?.tld}</span>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='paragraph'>
                                    <span className="subtitle">Currencies:</span> <span className="details">{getCurrencies(details?.currencies)}</span>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='paragraph' style={{ wordWrap: "break-word"}}>
                                    <span className="subtitle">Languages:</span>
                                    {getLanguanges(details?.languages).map((l, i) => {
                                        return(
                                            <span 
                                                className="details" 
                                                key={l}
                                            >
                                                {i !== 0 && ','}&nbsp;
                                                {l}
                                            </span>
                                        )
                                    })}
                                </Typography>
                            </Grid>
                            <Grid item lg={12} xs={12} className="border">
                                <span className="subtitle">Border Countries:</span>
                                {
                                    details?.borders?.map((b: string) => (
                                        <span 
                                            className="btn" 
                                            key={b} 
                                            onClick={() => dispatch(setCountry({country: b}))}
                                        >
                                            {b}
                                        </span>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}


export default Details;