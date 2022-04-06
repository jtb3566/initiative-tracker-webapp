import axios from "axios";

const fetchEncounters = async () => {
    return await (await axios.get(`http://localhost:8080/api/encounter/getAll`)).data
}

export default fetchEncounters