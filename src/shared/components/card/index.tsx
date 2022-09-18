import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./styles.scss";

interface props {
	country: any
}

const CustomCard: React.FC<props> = ({country}) => {
	const {name:{common}, population, region, capital, flags} = country
	return (
		<Card sx={{ maxWidth:"100%", boxShadow: "none"}} className="card">
			<CardActionArea sx={{paddingBottom: 2}}>
				<CardMedia
					component="img"
					height="200"
					image={flags.svg}
					alt="country-flag"
				/>
				<CardContent>
					<Typography gutterBottom variant="h6" component="div" className='title'>
						{common}
					</Typography>
					<Typography variant="body2" color="text.secondary" className='paragraph'>
						<span className="subtitle">Population:</span> <span className="details">{population.toLocaleString()}</span>
					</Typography>
					<Typography variant="body2" color="text.secondary" className='paragraph'>
						<span className="subtitle">Region:</span> <span className="details">{region}</span>
					</Typography>
					<Typography variant="body2" color="text.secondary" className='paragraph'>
						<span className="subtitle">Capital:</span> <span className="details">{capital}</span>
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default CustomCard;