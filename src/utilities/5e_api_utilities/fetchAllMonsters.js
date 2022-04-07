import axios from 'axios'

const fetchAllMonsters = async () => {
  return await (await axios.get('https://www.dnd5eapi.co/api/monsters')).data.results
}

export default fetchAllMonsters
