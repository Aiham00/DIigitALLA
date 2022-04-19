
module.exports = function(){
  const sqlite = require('sqlite3')

  const db = new sqlite.Database('././db/digitAlla.db')

    return {
      db
    }
}