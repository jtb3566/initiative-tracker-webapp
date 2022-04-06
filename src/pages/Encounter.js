import { Container, Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import fetchCharacters from '../utilities/fetchCharacters'
import addCharacterToEncounter from '../utilities/addCharacterToEncounter'
import rollInitiative from "../utilities/rollInitiative";
import deleteCharacterFromEncounter from "../utilities/deleteCharacterFromEncounter";
import fetchAllMonsters from "../utilities/fetchAllMonsters";
import fetchMonsterByUrl from "../utilities/fetchMonsterByUrl";
import addMonsterToEncounter from "../utilities/addMonsterToEncounter";
import EncounterTable from "./EncounterTable";

export default function Encounter() {
    const { state } = useLocation();
    const[encounter, setEncounter] = useState(state)
    const[characters, setCharacters] = useState([]);
    const[allMonsters, setAllMonsters] = useState([])
    const[monsters, setMonsters] = useState([])

    useEffect(() => {
        const retrieveCharacters = async () => {
            const fetchedCharacters = await fetchCharacters();
            setCharacters(fetchedCharacters);

        }
        retrieveCharacters();

        const retrieveAllMonsters = async () => {
            const fetchedAllMonsters = await fetchAllMonsters();
            setAllMonsters(fetchedAllMonsters)
        }
        retrieveAllMonsters();

    }, [])

    useEffect( () => {
        const retrieveMonsters = async () => {
            const monsterUrls = encounter.monsters.split(",")
            monsterUrls.shift()
            const fetchedMonsters = await fetchMonsterByUrl(monsterUrls)
            console.log(fetchedMonsters)
            setMonsters(fetchedMonsters)
        }
         retrieveMonsters();
    }, [encounter.monsters])

    let selectedCharacter;
    const handleChange = (event, value) => {
        selectedCharacter=value;
    }

    let selectedMonster;
    const handleMonsterChange = (event, value) => {
        selectedMonster = value;
    }

    const handleClick = async (event) => {
        event.preventDefault();
        const encounterWithAddedCharacter = await addCharacterToEncounter(selectedCharacter, encounter);
        setEncounter(encounterWithAddedCharacter);
    }

    const handleMonsterClick = async (event) => {
        event.preventDefault();
        const encounterWithAddedMonster = await addMonsterToEncounter(selectedMonster.url, encounter)
        setEncounter(encounterWithAddedMonster);
    }

    const navigate = useNavigate();
    const handleRedirect = () => {
        const passedEncounter = encounter;
        passedEncounter.participants = rollInitiative(passedEncounter.characters.concat(monsters));
        navigate('/InitiativeTracker', {state: passedEncounter})
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        const updatedEncounter = await deleteCharacterFromEncounter(event.currentTarget.characterId.value, encounter)
        setEncounter(updatedEncounter)
    }

    const characterOptions = characters.filter(c => !encounter.characters.map(c => c.id).includes(c.id))
    
    
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
            <EncounterTable 
                characters={encounter.characters} 
                monsters={monsters}
                handleDelete={handleDelete}
                handleChange={handleChange}
                characterOptions={characterOptions}
                handleClick = {handleClick}
                handleMonsterChange={handleMonsterChange}
                allMonsters = {allMonsters}
                handleMonsterClick={handleMonsterClick}
            />
            <hr></hr>
            <Button
                onClick={handleRedirect} 
                variant="contained"
                fullWidth
            >
                Roll for Initiative!
            </Button>  
        </Container>
    )
}