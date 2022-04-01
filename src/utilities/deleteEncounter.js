import axios from "axios";

const deleteEncounter = (encounter) => {
    axios.post("http://localhost:8080/api/encounter/delete", encounter)
}

export default deleteEncounter;