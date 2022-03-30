import { Container, Box, Typography, List,
ListItem, ListItemButton, Button} from "@mui/material";
import { useEffect, useState } from "react";
import fetchEncounters from "../utilities/fetchEncounters";
import {Link } from "react-router-dom"

export default function EncounterList() {
    const [encounters, setEncounters] = useState([]) 
    useEffect(() => {
        const retrieveEncounters = async () => {
            const fetchedEncounters = await fetchEncounters();
            setEncounters(fetchedEncounters);
        }
        retrieveEncounters();
    }, [])
    const listEncounters = encounters.map((encounter) =>
        <ListItem key={encounter.id.toString()} disablePadding>
            <ListItemButton>
                {encounter.name}
            </ListItemButton>
        </ListItem>
        );
    
    return (
        <Container component = "main" maxWidth="xs">
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
            </List>
            <Link to="/createEncounter">
                <Button
                    fullWidth
                    variant="contained"
                >
                    Create New Encounter
                </Button>
            </Link>
        </Container>
    )
}