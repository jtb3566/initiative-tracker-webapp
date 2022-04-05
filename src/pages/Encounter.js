import { Container, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Autocomplete, TextField, Button, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

import fetchCharacters from '../utilities/fetchCharacters'

export default function Encounter() {
    const { state } = useLocation();
    const[encounter, setEncounter] = useState(state)
    const[characters, setCharacters] = useState([]);
    
    useEffect(() => {
        const retrieveCharacters = async () => {
            const fetchedCharacters = await fetchCharacters();
            setCharacters(fetchedCharacters);
        }
        retrieveCharacters();
    }, [])

    return (
        <Container component = "main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1">
                    {encounter.name}
                </Typography>
            
            </Box>
            <TableContainer component="main">
                <Table size="small" aria-label="a dense table"> 
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">AC</TableCell>
                            <TableCell align="right">Initiative Mod</TableCell>
                        </TableRow>   
                    </TableHead>
                    <TableBody>
                        {encounter.characters.map((character) => (
                            <TableRow
                            key={character.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {character.name}
                                </TableCell>
                                <TableCell align="right">{character.armorClass}</TableCell>
                                <TableCell align="right">{character.initiativeMod}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box component="form">
                <Autocomplete
                    size="small"
                    disablePortal
                    id="newCharacter"
                    options={characters}
                    getOptionLabel={option => option.name}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Character" />}
                />
                <Button 
                    variant="contained"
                    type="submit"
                    size="small"
                >
                    Add Character
                </Button>  
            </Box>
        </Container>
    )
}