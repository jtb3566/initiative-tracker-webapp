import axios from 'axios'

const addCharacterToEncounter = async (character, encounter) => {
  encounter.characters.push(character)
  return await (await axios.post('http://localhost:8080/api/encounter/addCharacter', encounter)).data
}

export default addCharacterToEncounter
