import { Container, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export default function Encounter() {
    const { state } = useLocation();
    const[encounter, setEncounter] = useState(state)
    console.log(encounter);
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
                        </TableRow>   
                    </TableHead>
                    <TableBody>
                        {encounter.characters.map((character) => (
                            <TableRow
                            key={character.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {character.name}
                                </TableCell>
                                <TableCell align="right">{character.armorClass}</TableCell>
                                <TableCell align="right">{character.initiativeMod}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}