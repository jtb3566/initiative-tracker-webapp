import axios from 'axios'

const deleteCharacter = async (character) => {
  return await (await axios.post('http://localhost:8080/api/createdCharacter/delete', character)).data
}

export default deleteCharacter
