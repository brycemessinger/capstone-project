const data = [];

module.exports = {
    getScore: (req,res) => {
        res.status(200).send(data)
    },
    postScore: (req,res) => {
        const {jailTime, fines} = req.body
        let newScore = {
            jailTime: jailTime,
            fines: fines
        }
        data.push(newScore);
        console.log(data)
        res.status(200).send(data)
    }
}