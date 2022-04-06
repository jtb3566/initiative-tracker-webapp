import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Autocomplete, TextField, Button } from "@mui/material";

export default function EncounterTable (props) {
    const { handleDelete, handleClick, handleChange, handleMonsterChange, allMonsters, handleMonsterClick, characterOptions } = {...props}
    return (
        <TableContainer component="main">
                <Table size="small" aria-label="a dense table"> 
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">AC</TableCell>
                            <TableCell align="right">Initiative Mod</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>   
                    </TableHead>
                    <TableBody>
                        {props.characters.map((character) => (
                            <TableRow
                            key={character.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {character.name}
                                </TableCell>
                                <TableCell align="right">{character.armorClass}</TableCell>
                                <TableCell align="right">{character.initiativeMod}</TableCell>
                                <TableCell>
                                    <Box component="form" onSubmit={handleDelete}>
                                    <input
                                        type="hidden"
                                        name="characterId"
                                        value={character.id}
                                    >
                                    </input>
                                    <Button
                                        size="small"
                                        type="submit"
                                        variant="contained"
                                        color="error"
                                    >
                                        Delete
                                    </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                        {props.monsters.map((monster, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {monster.name}
                                </TableCell>
                                <TableCell align="right">{monster.armorClass}</TableCell>
                                <TableCell align="right">{monster.initiativeMod}</TableCell>
                                <TableCell>
                                    <Box component="form" onSubmit={handleDelete}>
                                    <input
                                        type="hidden"
                                        name="monsterName"
                                        value={monster.name}
                                    >
                                    </input>
                                    <Button
                                        size="small"
                                        type="submit"
                                        variant="contained"
                                        color="error"
                                    >
                                        Delete
                                    </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Autocomplete
                                    onChange={handleChange}
                                    size="small"
                                    disablePortal
                                    id="newCharacter"
                                    options={characterOptions}
                                    getOptionLabel={option => option.name}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Character" />}
                                />  
                            </TableCell>
                            <TableCell>
                                <Button onClick={handleClick}
                                    variant="contained"
                                    type="submit"
                                    size="small"
                                >
                                    Add Character
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Autocomplete
                                    onChange={handleMonsterChange}
                                    size="small"
                                    disablePortal
                                    id="newCharacter"
                                    options={allMonsters}
                                    getOptionLabel={option => option.name}
                                    isOptionEqualToValue={(option, value) => option.index === value.index}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Monsters" />}
                                />  
                            </TableCell>
                            <TableCell>
                                <Button onClick={handleMonsterClick}
                                    variant="contained"
                                    type="submit"
                                    size="small"
                                >
                                    Add Monster
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
    )

}