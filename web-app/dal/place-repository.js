const sqlite = require('sqlite3')


module.exports = function({
  dbConnection
}){
  const sqlite = require('sqlite3')

  const db = new sqlite.Database('././db/digitAlla.db')
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

          getPost(id,callback){
            const query =  `SELECT Id,Title,PostDateTime,Post.AccountId,FirstName,LastName,Organization,Body
            from Post
            JOIN Account on Post.AccountId = Account.AccountId
            WHERE post.Id = ?`
            const values = [id]
            db.get(query, values, function(error,post){
                callback(error,post)
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
        getPostAnswers(postId, callback){
          const query =  `SELECT PostId,Account.AccountId,AnswerId,Answer,AnswerDateTime,Organization from Post
          JOIN Answer on Answer.PostId = Post.Id
		      JOIN Account on Account.AccountId = Post.AccountId
          WHERE Post.Id = ?`
          const values = [postId]
          db.all(query, values, function(error,answers){
              callback(error,answers)
              
          })
        },
          getPostTags(postId, callback){
            const query =  `SELECT Tag.TagName from Post
            JOIN PostTag on PostTag .PostId = Post.Id
            JOIN Tag on Tag.TagId = PostTag.TagId
            WHERE Post.Id = ?`
            const values = [postId]
            db.all(query, values, function(error,tags){
                callback(error,tags)
                
            })
        }
      }
}