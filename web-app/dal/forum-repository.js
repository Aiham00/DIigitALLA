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