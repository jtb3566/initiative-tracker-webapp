import { Container, Box, Typography, Button } from '@mui/material'
import { useEffect, useState, React } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import fetchCharacters from '../../utilities/db_api_utilities/fetchCharacters'
import addCharacterToEncounter from '../../utilities/db_api_utilities/addCharacterToEncounter'
import rollInitiative from '../../utilities/rollInitiative'
import deleteCharacterFromEncounter from '../../utilities/db_api_utilities/deleteCharacterFromEncounter'
import fetchAllMonsters from '../../utilities/5e_api_utilities/fetchAllMonsters'
import fetchMonsterByUrl from '../../utilities/5e_api_utilities/fetchMonsterByUrl'
import addMonsterToEncounter from '../../utilities/db_api_utilities/addMonsterToEncounter'
import EncounterTable from '../page_elements/EncounterTable'
import deleteMonsterFromEncounter from '../../utilities/db_api_utilities/deleteMonsterFromEncounter'

export default function Encounter () {
  const { state } = useLocation()
  const [encounter, setEncounter] = useState(state)
  const [allCharacters, setAllCharacters] = useState([])
  const [allMonsters, setAllMonsters] = useState([])
  const [monsters, setMonsters] = useState([])
  const [selectedMonster, setSelectedMonster] = useState()
  const [selectedCharacter, setSelectedCharacter] = useState()

  useEffect(() => {
    const retrieveAllCharacters = async () => {
      const fetchedCharacters = await fetchCharacters()
      setAllCharacters(fetchedCharacters)
    }
    retrieveAllCharacters()

    const retrieveAllMonsters = async () => {
      const fetchedAllMonsters = await fetchAllMonsters()
      setAllMonsters(fetchedAllMonsters)
    }
    retrieveAllMonsters()
  }, [])

  useEffect(() => {
    const retrieveMonsters = async () => {
      const monsterUrls = encounter.monsters.split(',')
      monsterUrls.shift() // necessary becuase the db initializes monsters with an empty string
      const fetchedMonsters = await fetchMonsterByUrl(monsterUrls)
      setMonsters(fetchedMonsters)
    }
    retrieveMonsters()
  }, [encounter.monsters])

  const handleCharacterChange = (event, value) => {
    setSelectedCharacter(value)
  }

  const handleMonsterChange = (event, value) => {
    setSelectedMonster(value)
  }

  const handleCharacterAdd = async (event) => {
    event.preventDefault()
    if (selectedCharacter === undefined) {
      alert('Please select a character that has not already be added to the encounter')
    } else {
      const encounterWithAddedCharacter = await addCharacterToEncounter(selectedCharacter, encounter)
      setSelectedCharacter()
      setEncounter(encounterWithAddedCharacter)
    }
  }

  const handleMonsterAdd = async (event) => {
    event.preventDefault()
    const encounterWithAddedMonster = await addMonsterToEncounter(selectedMonster.url, encounter)
    setEncounter(encounterWithAddedMonster)
  }

  const navigate = useNavigate()
  const handleRedirect = () => {
    const passedEncounter = encounter
    const participants = passedEncounter.characters.concat(monsters)
    participants.forEach((p, index) => { p.participantId = index })
    passedEncounter.participants = rollInitiative(passedEncounter.characters.concat(monsters))
    navigate('/initiative-tracker-webapp/InitiativeTracker', { state: passedEncounter })
  }

  const handleCharacterDelete = async (event) => {
    event.preventDefault()
    const updatedEncounter = await deleteCharacterFromEncounter(event.currentTarget.characterId.value, encounter)
    setEncounter(updatedEncounter)
  }

  const handleMonsterDelete = async (event) => {
    event.preventDefault()
    console.log('I clicked delete')
    const updatedEncounter = await deleteMonsterFromEncounter(event.currentTarget.index.value, encounter)
    setEncounter(updatedEncounter)
  }

  const characterOptions = allCharacters.filter(c => !encounter.characters.map(c => c.id).includes(c.id))

  return (
        <Container component = "main" maxWidth="sm">
            <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
            >
                <Typography component="h1">
                    {encounter.name}
                </Typography>
            </Box>
            <EncounterTable
                characters={encounter.characters}
                monsters={monsters}
                handleDelete={handleCharacterDelete}
                handleChange={handleCharacterChange}
                characterOptions={characterOptions}
                handleClick = {handleCharacterAdd}
                handleMonsterChange={handleMonsterChange}
                allMonsters = {allMonsters}
                handleMonsterClick={handleMonsterAdd}
                handleMonsterDelete={handleMonsterDelete}
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
