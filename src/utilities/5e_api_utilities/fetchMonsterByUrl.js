import axios from 'axios'

const fetchMonsterByUrl = async (urls) => {
  const fetchedMonsters = []
  for (const url of urls) {
    const response = (await axios.get(`https://www.dnd5eapi.co${url}`)).data
    const monster = {
      name: response.name,
      armorClass: response.armor_class,
      initiativeMod: (Math.floor(response.dexterity / 2)) - 5
    }
    fetchedMonsters.push(monster)
  }
  return fetchedMonsters
}
export default fetchMonsterByUrl
