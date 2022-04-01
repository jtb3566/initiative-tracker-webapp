import axios from "axios";

const deleteEncounter = async (encounter) => {
    return await (await axios.post("http://localhost:8080/api/encounter/delete", encounter)).data
}

export default deleteEncounter;