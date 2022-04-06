import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, Button } from "@mui/material";
import sortParticipants from "../../utilities/sortParticipants";

export default function IniativeTracker() {
    const { state } = useLocation();
    const [encounter, setEncounter] = useState(state);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedEncounter = {...encounter}
        const participantIndex = updatedEncounter.participants.map(p => p.id).indexOf(Number(event.currentTarget.participantId.value))
        updatedEncounter.participants[participantIndex].initiative = event.currentTarget.initiative.value
        updatedEncounter.participants=sortParticipants(updatedEncounter.participants)
        setEncounter(updatedEncounter);
    }

    const tableBody = encounter.participants ? (
        <TableBody>
            {encounter.participants.map((participant, index) => (
                <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {participant.name}
                    </TableCell>
                    <TableCell align="right">{participant.armorClass}</TableCell>
                    <TableCell align="right">{participant.initiativeMod}</TableCell>
                    <TableCell align="right">{participant.initiative}</TableCell>
                    <TableCell align="right">
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                size="small"
                                margin="normal"
                                required
                                id="initiative"
                                label="Initiative"
                                name="initiative"
                                type="number"
                            />
                            <input
                            type="hidden"
                            name="participantId"
                            value={participant.id}
                            >
                            </input>
                            <Button
                                size="small"
                                type="submit"
                                variant="contained"
                            >
                                Submit
                            </Button>  
                        </Box>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    ) : (
        <TableBody>
            <TableRow>
            <TableCell align="right">Loading...</TableCell>
            </TableRow>
        </TableBody>
    )

    return (
        <Container component = "main" maxWidth="md">
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
                            <TableCell align="right">Initiative</TableCell>
                            <TableCell align="right">Initiative Overide</TableCell>
                        </TableRow>   
                    </TableHead>
                    {tableBody}
                </Table>
            </TableContainer>
        </Container>   
    )
}
