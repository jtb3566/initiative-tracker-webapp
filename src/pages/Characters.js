import { useEffect, useState } from "react";
import { Container, Box, Typography, List, ListItem, ListItemText, Button, TextField } from "@mui/material";

import fetchCharacters from "../utilities/fetchCharacters"
import deleteCharacter from "../utilities/deleteCharacter"
import createCharacter from "../utilities/createCharacter";

export default function Characters() {
    const [characters, setCharacters] = useState([])
    useEffect(() => {
        const retrieveCharacters = async () => {
            const fetchedCharacters = await fetchCharacters();
            setCharacters(fetchedCharacters);
        }
        retrieveCharacters();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const character = {
            name: event.currentTarget.name.value,
            initiativeMod: event.currentTarget.initiativeMod.value,
            armorClass: event.currentTarget.armorClass.value,
        }
        const created = await createCharacter(character);
        setCharacters([...characters, created])
    }

    const handleDelete = async (character) => {
        const confirmed = window.confirm(`Are you sure you want to delete ${character.name}?`);
        if (confirmed) {
            const deleted = await deleteCharacter(character)
            deleted ? setCharacters(characters.filter((c) => c.id !== character.id)) : alert("Character could not be deleted")
        }
    }

    const listCharacters = characters.map((character) => 
        <ListItem key={character.id.toString()}>
            <ListItemText>
                {character.name}
            </ListItemText>
            <Button onClick={() => handleDelete(character)} color="error" variant="contained">
                DELETE
            </Button>
        </ListItem>
    )

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
                    Characters
                </Typography>
            </Box>
            <List>
                {listCharacters}
            <ListItem component="form" onSubmit={handleSubmit}>
                <TextField
                    size="small"
                    margin="normal"
                    required
                    id="name"
                    label="Name"
                    name="name"
                    type="text"
                />
                <TextField
                    size="small"
                    margin="normal"
                    required
                    id="initiativeMod"
                    label="Initiative Mod"
                    name="initiativeMod"
                    type="number"
                />
                <TextField
                    size="small"
                    margin="normal"
                    id="armorClass"
                    label="Armor Class"
                    name="armorClass"
                    type="number"
                />
                <Button
                    type="submit"
                    variant="contained"
                >
                    Create
                </Button>  
            </ListItem>
            </List>
        </Container>
    )
}