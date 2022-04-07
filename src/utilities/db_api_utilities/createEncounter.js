import axios from 'axios'

const createEncounter = async (encounter) => {
  return await (await axios.post('http://localhost:8080/api/encounter/create', encounter)).data
}

export default createEncounter
