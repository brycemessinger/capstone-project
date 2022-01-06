const data = [];

module.exports = {
    getScore: (req,res) => {
        res.status(200).send(data)
    },
    postScore: (req,res) => {
        console.log(req.body)
        const {jailtime, fines} = req.body
        let newScore = {
            jailtime: jailtime,
            fines: fines
        }
        data.push(newScore);
        console.log(data)
        res.status(200).send(data)
    }
}