import { Container, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Autocomplete, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import fetchCharacters from '../utilities/fetchCharacters'
import addCharacterToEncounter from '../utilities/addCharacterToEncounter'
import rollInitiative from "../utilities/rollInitiative";
import deleteCharacterFromEncounter from "../utilities/deleteCharacterFromEncounter";

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

    let selectedCharacter;
    const handleChange = (event, value) => {
        selectedCharacter=value;
    }

    const handleClick = async (event) => {
        event.preventDefault();
        const encounterWithAddedCharacter = await addCharacterToEncounter(selectedCharacter, encounter);
        setEncounter(encounterWithAddedCharacter);
    }

    const navigate = useNavigate();
    const handleRedirect = () => {
        const passedEncounter = encounter;
        passedEncounter.participants = rollInitiative(passedEncounter.characters);
        navigate('/InitiativeTracker', {state: passedEncounter})
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        console.log(encounter.characters)
        const updatedEncounter = await deleteCharacterFromEncounter(event.currentTarget.characterId.value, encounter)
        console.log(updatedEncounter.characters)
        setEncounter(updatedEncounter)
    }

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
                            <TableCell align="right"></TableCell>
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
                                <TableCell>
                                    <Box component="form" onSubmit={handleDelete}>
                                    <input
                                        type="hidden"
                                        name="characterId"
                                        value={character.id}
                                    >
                                    </input>
                                    <Button
                                        size="small"
                                        type="submit"
                                        variant="contained"
                                        color="error"
                                    >
                                        Delete
                                    </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Autocomplete
                                    onChange={handleChange}
                                    size="small"
                                    disablePortal
                                    id="newCharacter"
                                    options={characters}
                                    getOptionLabel={option => option.name}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Character" />}
                                />  
                            </TableCell>
                            <TableCell>
                                <Button onClick={handleClick}
                                    variant="contained"
                                    type="submit"
                                    size="small"
                                >
                                    Add Character
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <hr></hr>
            <Button
                onClick={handleRedirect} 
                variant="contained"
                fullWidth
            >
                Roll for Initiative!
            </Button>  
        </Container>
    )
}