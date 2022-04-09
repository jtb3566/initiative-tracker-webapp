import axios from 'axios'

const fetchAccountByEmail = async (email) => {
  return await (await axios.post('http://localhost:8080/api/getAccountByEmail', email)).data
}

export default fetchAccountByEmail
