var db = require('../database');
function pokedex(pokemon, user) {
    if (check) {
        // if(npkdx = True)
        db.con.query(``);
  
        db.con.query(`SELECT * FROM pokedex WHERE pokemon_id = 1`, (err, results) => {
          if (err) throw err;
  
          let randomdex = Math.ceil(Math.random() * (results.length))
  
          let entry = results[randomdex].entry
  
          console.log(entry)
  
          message.channel.send(entry);
  
        });
  
      } else {
        message.channel.send('There is no pokemon. try $pokemon');
      }
}

module.exports = {
    pokedex
}