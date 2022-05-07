const sqlite = require('sqlite3')


module.exports = function({
  dbConnection
}){
  const sqlite = require('sqlite3')

  const db = new sqlite.Database('././db/digitAlla.db')
      return {

          getAllPosts( callback){
              const query =  `SELECT id,Title,PostDateTime,Post.AccountId,FirstName,LastName,Organization
              from Post
              JOIN Account on Post.AccountId = Account.AccountId
              ORDER by PostDateTime desc`
              const values = []
              db.all(query, values, function(error,posts){
                  callback(error,posts)
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

        createAnswer(answer,callback){
          const query =  `INSERT INTO Answer ( Answer,PostId,AnswerDateTime) VALUES(?,?,datetime("now"))`
          const values = [answer.answer,answer.postId]
          db.run(query, values, function(error){
              callback(error)
              
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
        },
        createPost(post,callback){
          const query =  `INSERT INTO Post (AccountId,Body,Title,PostDateTime) VALUES(?,?,?,datetime("now"))`
          const values = [post.accountId,post.body,post.title]
          db.run(query, values, function(error){

            if(error){
              callback(error)

            }else{
              const postId = this.lastID 
              for(let i = 1; i < post.tag.length; i++ ){
                const query =  `INSERT INTO PostTag (PostId,TagId) VALUES(?,?)`
                const values = [postId,post.tag[i]]

                db.run(query, values, function(error){
                  
                  if(error){
                    callback(error)
                  }
                })
              }
              callback(error)

            }
          })
        },      
      }
}