import axios from "axios";

const deleteMonsterFromEncounter = async (index, encounter) => {
    const urlsArr = encounter.monsters.split(",")
    urlsArr.splice(index+1, 1) // adding one because of the empty index we remove for monsters
    encounter.monsters = urlsArr.join(",")
    return await (await axios.post('http://localhost:8080/api/encounter/deleteMonster', encounter)).data
}

export default deleteMonsterFromEncounter;