const sqlite = require('sqlite3')


module.exports = function({
  databasePath
}){
  const sqlite = require('sqlite3')

  const db = new sqlite.Database(databasePath)
  return {

    getAllPlaces( callback){
        const query =  `SELECT * from Place
        JOIN Account on Place.AccountId = Account.AccountId
        JOIN OpenTime on OpenTime.OpenTimeId = Place.OpenTimeId`
        const values = []
        db.all(query, values, function(error,Places){
            callback(error,Places)
        })
    },

    getMyPlaces(accountId,callback){
      const query =  `SELECT PlaceId,HelpType,PlaceName,Lat,Lng,Link,Address,Kommun,Place.Phone,Organization,Email,Note,
          MonFrom,MonTo,TueFrom,TueTo,WedFrom,WedTo,ThuFrom,ThuTo,FriFrom,FriTo,SatFrom,SatTo,SunFrom,SunTo
          from Place
          JOIN Account on Place.AccountId = Account.AccountId
          JOIN OpenTime on OpenTime.OpenTimeId = Place.OpenTimeId
          WHERE Account.AccountId = ?`

      const values = [accountId]
      db.all(query, values, function(error,places){
          callback(error,places)
      })
    },

    createPlace(place,callback){
      const query =  `INSERT INTO OpenTime 
      ( MonFrom,MonTo,TueFrom,TueTo,WedFrom,WedTo,ThuFrom,ThuTo,FriFrom,FriTo,SatFrom,SatTo,SunFrom,SunTo,Note)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
      const values = [ place.monFrom,place.monTo,place.tueFrom,place.tueTo,place.wedFrom,place.wedTo,place.thuFrom,
        place.thuTo,place.friFrom,place.friTo,place.satFrom,place.satTo,place.sunFrom,place.sunTo,place.note]
      db.run(query, values, function(error){
          if (error){
            callback(error)
          }else{
            const query =  `INSERT INTO Place (PlaceName,Lat,Lng,Link,Address,Kommun,Phone,AccountId,OpenTimeId,Type)
            VALUES(?,?,?,?,?,?,?,?,?,?)`
            const values = [place.name,place.lat,place.lng,place.link,place.address,
              place.kommun,place.phone,place.accountId,this.lastID,place.type]
            db.run(query, values, function(error){
              if (error){
                callback(error)
              }else{
                callback(error)
              }
            })
          }   
      })
    },

    getPlacesSearchResult(searchWords,callback){
      const query =  `SELECT HelpType,PlaceName,Lat,Lng,Link,Address,Kommun,Place.Phone,Organization,Email,Note,
        MonFrom,MonTo,TueFrom,TueTo,WedFrom,WedTo,ThuFrom,ThuTo,FriFrom,FriTo,SatFrom,SatTo,SunFrom,SunTo
        from Place
        JOIN Account on Place.AccountId = Account.AccountId
        JOIN OpenTime on OpenTime.OpenTimeId = Place.OpenTimeId
        WHERE( Kommun like ?
        or Address like ?
        or PlaceName like ?
        or HelpType like ?
        or Organization like ?)
        and Kommun like ?`
        for(let i = 0; i < searchWords.length; i++ ){
          searchWords[i] = "%"+searchWords[i]+"%"
        }
      const values = [searchWords[0],searchWords[0],searchWords[0],searchWords[0],searchWords[0],searchWords[1]]
      db.all(query, values, function(error,places){
          callback(error,places)
      })
    }
  }
}