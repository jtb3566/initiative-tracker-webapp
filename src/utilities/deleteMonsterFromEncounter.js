import axios from "axios";

const deleteMonsterFromEncounter = async (index, encounter) => {
    const deleteIndex = index + 1
    const urlsArr = encounter.monsters.split(",")
    const newUrlsArr = urlsArr.filter((u, index) => {
        if (index !== deleteIndex) {
            return u
        }
     })
    encounter.monsters = newUrlsArr.join(",")
    return await (await axios.post('http://localhost:8080/api/encounter/deleteMonster', encounter)).data
}

export default deleteMonsterFromEncounter;