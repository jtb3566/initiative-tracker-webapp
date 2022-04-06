import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import fetchAccountByEmail from "../../utilities/fetchAccountByEmail";

export default function CreateAccount() {

    const handleSubmit = (event) => {
        event.preventDefault();
               
        const data = {
            email: event.currentTarget.email.value,
            username: event.currentTarget.username.value,
            password: event.currentTarget.password.value
        }
        
        fetchAccountByEmail(event.currentTarget.email.value)

        axios.post(`http://localhost:8080/api/createAccount`, data)
        .then(function (response) {
            console.log(response);
            })
        }


    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Create an Account
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        type="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                    /> 
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2}}
                    >
                        Create Account
                    </Button>   
                </Box>    
            </Box>
        </Container>
    );
}