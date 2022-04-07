import axios from 'axios'

const deleteCharacterFromEncounter = async (characterId, encounter) => {
  const updatedCharacters = encounter.characters.filter(c => Number(c.id) !== Number(characterId))
  encounter.characters = updatedCharacters
  return await (await axios.post('http://localhost:8080/api/encounter/deleteCharacter', encounter)).data
}

export default deleteCharacterFromEncounter
