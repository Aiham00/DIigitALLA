module.exports = function({
  forumRepository,
  blogRepository,
  constants,
  errorCodes
  
}){

      return {

          getAllPosts(accountType,callback){
            if(accountType){
              forumRepository.getAllPosts(function(error,posts){

                if ( error){
                  callback(errorCodes.DATABASE_ERROR)
                }else if(posts.length!=0){
  
                  function getPostsTags (posts,length){
                    if (length == 0){
                      callback(error,posts)
                      return 
                    }
                    
                    forumRepository.getPostTags(posts[length-1].Id,function(error,tags){
                      if (error){
                        posts[length-1]["tags"]=[]
                      }else{
                        posts[length-1]["tags"]=tags
                      }
                
                       getPostsTags(posts,length-1)
                
                    })
                  }
                  getPostsTags(posts,posts.length)
                  
       
                }else{
                  callback(error,[])
                
                }
              })
            }


          },

          getPost(postId,callback){
            forumRepository.getPost(postId,function(error,post){

              if ( error){
                callback("database error")
              }else if(post){
                forumRepository.getPostTags(post.Id,function(error,tags){
                  if (error){
                    post["tags"]=[]
                  }else{
                    post["tags"]=tags
                  }
                  forumRepository.getPostAnswers(post.Id,function(error,answers){
                    if(error){
                      post["answers"]=[]
                    }else{
                      post["answers"]=answers
                    }
                    callback(error,post)
                  })                        
                })                
     
              }else{
                callback(error,{})
              
              }
            })

          },

          createAnswer(answer,callback){
            forumRepository.createAnswer(answer,function(error){
              callback(error)
            })
          },
          createPost(accountId,accountType,post,callback){

            if(accountType == constants.ORGANIZATION && accountId== post.accountId){
              forumRepository.createPost(post,function(error){

                if (error){
                  callback([error])

                }else {
                  callback([])
                }
              })
            }else{
              callback([errorCodes.UNAUTHORIZED_USER])
            }

          },
          getAnswerReplies(accountType,answerId,callback){
            if(accountType == constants.ORGANIZATION ){
              blogRepository.getAnswerReplies(answerId,function(error,replies){

                if (error){
                  callback([error])

                }else {
                  callback(error,replies)                
                }
              })
            }else{
              callback([errorCodes.UNAUTHORIZED_USER])
            }

          }
      }



}