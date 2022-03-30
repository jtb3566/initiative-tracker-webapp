import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CreateEncounter() {
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: event.currentTarget.name.value,
        }
        
        axios.post(`http://localhost:8080/api/encounter/create`, data)
    }

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
                <Typography component="h1" variant = "h5">
                    Create An Encounter
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    type="text"
                    autoFocus
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2}}
                >
                    Create Encounter
                </Button>
                <Link to="/"> 
                    <Button
                        fullWidth
                        varient="contained"
                        sx={{ mt: 3, mb: 2}}
                    >
                        Return to Encounters
                    </Button>
                </Link>
            </Box>
        </Container>
    )
}