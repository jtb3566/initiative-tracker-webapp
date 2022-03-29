import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";

export default function CreateCharacter() {
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: event.currentTarget.name.value,
            initiativeMod: event.currentTarget.initiativeMod.value,
            armorClass: event.currentTarget.armorClass.value
        }
        
        axios.post(`http://localhost:8080/api/createdCharacter/createCharacter`, data)
        .then(function(response) {
            console.log(response)
        })
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
                    Create A Character
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="initiativeMod"
                    label="Initiative Modifier"
                    name="initiativeMod"
                    type="number"
                    
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="armorClass"
                    label="Armor Class"
                    name="armorClass"
                    type="number"
                    min = "0"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2}}
                >
                    Create Character
                </Button>
            </Box>
        </Container>
    )
}