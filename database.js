const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pocatch"
})

con.connect(err => {
    if(err) throw err;
    console.log("Connected to the database");
})

exports.con = con 

exports.addUser = function addUser(user) {
    con.query(`INSERT INTO users (discord_name) VALUES ('${user}')`, (err, results) => {
        if(err) throw err;

        console.log('user added :D')  

        return
    });
}

exports.getUser = async function getUser(user) {
    con.query(`SELECT * FROM users WHERE discord_name = '${user}'`, (err, results) => {
        if(err) throw err;

        console.log(results[0])

        if (results[0] == undefined)
        {
            const result = results[0]
            console.log('test')
            return result

        } else {
            user = results[0]

            console.log(user)

            return user.discord_name
        }     
    });
}

exports.getPokemon = function getPokemon(random) {
    con.query(`SELECT * FROM pokemon WHERE pokemon_id = ${random}`, (err, results) => {
        if(err) throw err;

        pokemon = results[0].pokemon_name

        console.log(pokemon)

        return pokemon
        
    });
}