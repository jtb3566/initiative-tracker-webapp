import { Container, Box, Typography, TextField, Button } from '@mui/material'
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import fetchAccountByEmail from '../../utilities/db_api_utilities/fetchAccountByEmail'
import bcrypt from 'bcryptjs'

export default function CreateAccount () {
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = {
      email: event.currentTarget.email.value,
      displayName: event.currentTarget.displayName.value,
      passwordHash: bcrypt.hashSync(event.currentTarget.password.value, bcrypt.genSaltSync())
    }
    const existingAccount = await fetchAccountByEmail(formData.email)
    if (existingAccount) {
      alert('There is already an account under this e-mail')
    } else {
      axios.post('http://localhost:8080/api/createAccount', formData)
        .then(function (response) {
          console.log(response)
        })

      navigate('/initiative-tracker-webapp')
    }
  }

  return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
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
                        id="displayName"
                        label="Display Name"
                        name="displayName"
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
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create Account
                    </Button>
                </Box>
            </Box>
        </Container>
  )
}
