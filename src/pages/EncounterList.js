import { Container, Box, Typography, List,
ListItem, ListItemButton, Button, 
TextField} from "@mui/material";
import { useEffect, useState } from "react";
import fetchEncounters from "../utilities/fetchEncounters";
import deleteEncounter from "../utilities/deleteEncounter";
import createEncounter from "../utilities/createEncounter";

export default function EncounterList() {
    const [encounters, setEncounters] = useState([]) 
    useEffect(() => {
        const retrieveEncounters = async () => {
            const fetchedEncounters = await fetchEncounters();
            setEncounters(fetchedEncounters);
        }
        retrieveEncounters();
    }, [encounters])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const encounter = {
            name: event.currentTarget.name.value,
        }
        const created = await createEncounter(encounter);
        encounters.push(created)

    }

    const handleDelete = async (encounter) => {
        const confirmed = window.confirm(`Are you sure you want to delete ${encounter.name}?`);
        if (confirmed) {
            const deleted = await deleteEncounter(encounter)
            deleted ? delete encounters[encounters.indexOf(encounter)] : alert("Encounter could not be deleted")
        }
    }

    const listEncounters = encounters.map((encounter) =>
        <ListItem key={encounter.id.toString()}> 
            <ListItemButton>
                {encounter.name}
            </ListItemButton>
            <Button onClick={() => handleDelete(encounter)} color="error" variant="contained"> 
                DELETE
            </Button>
        </ListItem>
        );
    
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
                <Typography component="h1" varient = "h5">
                    Encounters
                </Typography>
            </Box>
            <List>
                {listEncounters}
                <ListItem component="form" onSubmit={handleSubmit} > 
                <TextField
                    size="small"
                    margin="normal"
                    required
                    id="name"
                    label="Name"
                    name="name"
                    type="text"
                />
                <Button
                    size="small"
                    type="submit"
                    variant="contained"
                >
                    Create Encounter
                </Button>
            </ListItem>
            </List>
        </Container>
    )
}