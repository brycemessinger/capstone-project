module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        create table score (
            player_id SERIAL PRIMARY KEY,
            jailtime INT,
            fines INT,
        )
        
        `)
    }
}