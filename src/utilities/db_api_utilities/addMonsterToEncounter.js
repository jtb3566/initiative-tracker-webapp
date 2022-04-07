import axios from 'axios'

const addMonsterToEncounter = async (url, encounter) => {
  encounter.monsters = encounter.monsters + ',' + url
  return await (await axios.post('http://localhost:8080/api/encounter/addMonster', encounter)).data
}

export default addMonsterToEncounter
