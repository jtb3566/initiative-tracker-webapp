import axios from "axios";

const createCharacter = async (character) => {
    return await (await axios.post(`http://localhost:8080/api/createdCharacter/create`, character)).data
}

export default createCharacter;