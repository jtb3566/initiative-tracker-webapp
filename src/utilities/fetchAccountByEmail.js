import axios from "axios";

const fetchAccountByEmail = async (data) => {
    let account = await axios.post(`http://localhost:8080/api/getAccountByEmail`, data)
        .then(function (response) {
            console.log(response);
          })
    return account
}

export default fetchAccountByEmail;