const baseURL = 'http://localhost:4050/api/scores'
const getScore = async () => await axios.get(baseURL).then(res => {
    console.log(res.data)
})

getScore()