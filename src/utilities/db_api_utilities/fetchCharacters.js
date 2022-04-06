import axios from "axios";

const fetchCharacters = async () => {
    return await (await axios.get(`http://localhost:8080/api/createdCharacter/getAll`)).data
}

export default fetchCharacters;