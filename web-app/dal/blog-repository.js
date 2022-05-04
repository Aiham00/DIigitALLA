const sqlite = require('sqlite3')


module.exports = function({
  dbConnection
}){
  const sqlite = require('sqlite3')

  const db = new sqlite.Database('././db/digitAlla.db')

  
  function getBlogParagraphs(blogId,callback){
    const query =  `SELECT *from BlogParagraph
    WHERE BlogParagraph.BlogId = ?
	  ORDER By OrderNr`
    const values = [blogId]
    db.all(query, values, function(error,blog){

      callback(error,blog)      
    })

          
  }
      return {

        getAllBlogs( callback){
              const query =  `SELECT BlogId,BlogTitle,BlogDateTime,Blog.BlogAccountId,BlogImageAddress,Organization,BlogTypeName
              from Blog
              JOIN Account on Blog.BlogAccountId = Account.AccountId
			        JOIN BlogType on BlogType.BlogTypeId = Blog.BlogTypeId
              ORDER by BlogDateTime desc `
              const values = []
              db.all(query, values, function(error,blogs){
                  callback(error,blogs)
              })
          },
          getAllBlogsByType(typeId, callback){
            const query =  `SELECT BlogId,BlogTitle,BlogDateTime,Blog.BlogAccountId,BlogImageAddress,Organization,BlogTypeName
            from Blog
            JOIN Account on Blog.BlogAccountId = Account.AccountId
            JOIN BlogType on BlogType.BlogTypeId = Blog.BlogTypeId
            WHERE BlogType.BlogTypeId =? 
            ORDER by BlogDateTime desc   `
            const values = [typeId]
            db.all(query, values, function(error,blogs){
                callback(error,blogs)
            })
        },

          getBlog(blogId,callback){
            const query =  `SELECT BlogId,BlogTitle,BlogDateTime,Blog.BlogAccountId,BlogImageAddress,Organization,BlogTypeName
            from Blog
            JOIN Account on Blog.BlogAccountId = Account.AccountId
            JOIN BlogType on BlogType.BlogTypeId = Blog.BlogTypeId
            WHERE BLog.BlogId = ?`
            const values = [blogId]
            db.get(query, values, function(error,blog){
              if(error){
                callback(error)
              }else if (blog){
                getBlogParagraphs(blogId,function(error,paragraphs){
                  if (error){
                    blog["paragraphs"]=[]
                  }else{
                    blog["paragraphs"]=paragraphs
                  }
                    callback(error,blog)
                })

              }else{
                callback(error,{})
              }
            })
        },

        createBlog(blog,callback){
          const query =  `INSERT INTO Blog (BlogTitle,BlogAccountId,BlogTypeId,BlogDateTime)
          VALUES (?,?,?,datetime("now"));`
          const values = [blog.title,blog.accountId,blog.type]
          db.run(query, values, function(error){
            if(error){
              callback(error)
            }else{

              for(let i = 1; i < blog.paragraph.length; i++ ){
                const query =  `INSERT INTO BlogParagraph (BlogId,LinkTitle,Link,Body,OrderNr)
                VALUES (?,?,?,?,?);`
                const values = [this.lastID,blog.linkTitle[i],blog.link[i],blog.paragraph[i],i]
                db.run(query, values, function(error){
                  if(error){
                    callback("Perror")
                  }
                })
              }
              callback(error)

            }              
          })
        },
        createComment(comment,callback){
          const query =  `INSERT INTO Answer ( Answer,BlogId,AnswerDateTime) VALUES(?,?,datetime("now"))`
          const values = [comment.comment,comment.blogId]
          db.all(query, values, function(error){
              callback(error)
              
          })
        },
        getBlogComments(blogId, callback){
          const query =  `SELECT Blog.BlogId,Account.AccountId,Answer,AnswerId,AnswerDateTime,Organization from Blog
          JOIN Answer on Answer.BlogId = Blog.BlogId
		      JOIN Account on Account.AccountId = Blog.BlogAccountId
          WHERE Blog.BlogId = ?`
          const values = [blogId]
          db.all(query, values, function(error,comments){
              callback(error,comments)
              
          })
        },

        getAnswerReplies(answerId, callback){
          const query =  `SELECT  Answer.AnswerId,Reply.ReplyText,ReplyDateTime,Reply.ReplyiId,Organization,Account.AccountId
           from Answer
          JOIN Reply on Answer.AnswerId = Reply.AnswerId
		      JOIN Account on Account.AccountId = Reply.AccountId
          WHERE Answer.AnswerId = ?`
          const values = [answerId]
          db.all(query, values, function(error,replies){
              callback(error,replies)
              
          })
        },

        createRebly(reply,callback){
          const query =  `INSERT INTO Reply ( ReplyText,AnswerId,AccountId,ReplyDateTime)
           VALUES(?,?,?,datetime("now"))`
          const values = [reply.reply,reply.answerId,reply.accountId]
          db.all(query, values, function(error){
              callback(error)
              
          })
        }

      }
}