import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import rollInitiative from "../utilities/rollInitiative";

export default function IniativeTracker() {
    const { state } = useLocation();
    const [encounter, setEncounter] = useState(state);

    encounter.participants = rollInitiative(encounter.characters)

    const tableBody = encounter.participants ? (
        <TableBody>
            {encounter.participants.map((participant) => (
                <TableRow
                    key={participant.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {participant.name}
                    </TableCell>
                    <TableCell align="right">{participant.armorClass}</TableCell>
                    <TableCell align="right">{participant.initiativeMod}</TableCell>
                    <TableCell align="right">{participant.initiative}</TableCell>
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
                            <TableCell align="right">Initiative</TableCell>
                        </TableRow>   
                    </TableHead>
                    {tableBody}
                </Table>
            </TableContainer>
        </Container>   
    )
}
