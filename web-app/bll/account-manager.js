module.exports = function({
  blogRepository,
  accountRepository
  
}){

      return {

        getAllBlogs(AccountId,callback){
          blogRepository.getAllBlogs(function(error,blogs){

              if ( error){
                callback("database error")
              }else{
                callback(error,blogs)
              
              }
            })

          },

          getBlog(blogId,callback){
            blogRepository.getBlog(blogId,function(error,blog){

              if ( error){
                callback("database error")
              }else {
                blogRepository.getBlogComments(blogId,function(error,comments){
                  if(error){
console.log(error)
                  }else if(comments.length == 0){
                    blog["comments"]=[]
                    callback(error,blog)

                  }else {
                    blog["comments"]=comments

                    function getAnswersReplies (comments,length){
                      if (length == 0){
                        callback(error,blog)
                        return 
                      }
                      
                      blogRepository.getAnswerReplies(comments[length-1].AnswerId,function(error,replies){
                        if (error){
                          comments[length-1]["replies"]=[]
                        }else{
                          comments[length-1]["replies"]=replies
                          
                        }
                  
                        getAnswersReplies(comments,length-1)
                  
                      })
                    }
                    getAnswersReplies(comments,comments.length)

                  }
                })
              
              }
            })

          },

          createAccount(account,callback){
            account['hashedPassword'] = account.password
            delete account.password

            accountRepository.createAccount(account,function(error){

              callback(error)
            })
          },
          createBlog(accountId,blog,callback){
            blogRepository.createBlog(blog,function(error){
              callback(error)
            })
          },

          createRebly(accountId,rebly,callback){
            blogRepository.createRebly(rebly,function(error){
              callback(error)
            })
          }
      }



}