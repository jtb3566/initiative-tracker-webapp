import axios from "axios";

const fetchEncounters = async () => {
    const result = await axios.get(`http://localhost:8080/api/encounter/getAll`)
    return result.data

}

export default fetchEncounters