const sqlite = require('sqlite3')


module.exports = function({
  dbConnection
}){
  const sqlite = require('sqlite3')

  const db = new sqlite.Database('././db/digitAlla.db')
      return {

        getAllAccounts( callback){
          const query =  `SELECT AccountId,FirstName,LastName,Organization,Phone,TypeName,Email,CreationDateTime,IsActive
          from Account
          JOIN AccountType on Account.TypeId = AccountType.TypeId
		      WHERE IsActive = 1
          ORDER by Organization `
          const values = []
          db.all(query, values, function(error,accounts){
              callback(error,accounts)
          })
        },

          getAccount(id,callback){
            const query =  `SELECT AccountId,FirstName,LastName,Organization,Phone,TypeName,Email,CreationDateTime,IsActive,Description,Interest
            from Account
            JOIN AccountType on AccountType.TypeId = Account.TypeId
            WHERE Account.AccountId = ?`
            const values = [id]
            db.get(query, values, function(error,account){
                callback(error,account)
            })
        },

        createAccount(account,callback){
          const query =  `INSERT INTO Account 
          (FirstName,LastName,Organization,Email,Phone,Description,HashedPassowrd,TypeId,Interest,CreationDateTime)
          VALUES(?,?,?,?,?,?,?,?,?,datetime("now"))`
          const values = [account.firstName,account.lastName,account.org,account.email,
            account.phone,account.description,account.hashedPassword,account.accountType,account.interest]
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
        }
      }
}