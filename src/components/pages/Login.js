import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'
import fetchAccountByEmail from '../../utilities/db_api_utilities/fetchAccountByEmail'
import bcrypt from 'bcryptjs'

export default function Login (props) {
  const { setToken } = { ...props }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value
    }
    const account = await fetchAccountByEmail(formData.email)
    if (!account) {
      alert('No account exists for this e-mail')
    } else {
      const passwordMatches = bcrypt.compareSync(formData.password, account.passwordHash)
      if (passwordMatches) {
        setToken(account.id)
      } else {
        alert('Incorrect password')
      }
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
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/initiative-tracker-webapp/createAccount" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  )
}
