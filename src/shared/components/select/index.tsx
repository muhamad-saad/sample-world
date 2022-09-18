import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./styles.scss";

interface props {
    regions: string[]
    region: string,
    setRegion: (region: string) => void
}

const CustomSelect: React.FC<props> = ({regions, region, setRegion}) => {

    const handleChange = (e: SelectChangeEvent) => {
        setRegion(e.target.value);
    };

    return (
        <>
            <FormControl className="selectBox">
                <Select
                    value={region}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    className="input"
                >
                    <MenuItem value="" disabled>Filter by Region</MenuItem>
                    {
                        regions?.map((r: any, i: number) => <MenuItem key={i} value={r}>{r}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </>
    )
}


export default CustomSelect;