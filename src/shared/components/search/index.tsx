import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import "./styles.scss";

interface props {
    setSearch: (search: string) => void
}

const Search: React.FC<props> = ({setSearch}) => {

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <>
            <Paper
                component="form"
                className="searchBox"
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <SearchIcon className='icon'/>
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search for a country ..."
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={handleSearch}
                    className="input"
                />
            </Paper>
        </>
    )
}


export default Search;