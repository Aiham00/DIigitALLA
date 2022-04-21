module.exports = function({
  forumRepository
  
}){

      return {

          getAllPosts(AccountId,callback){
            forumRepository.getAllPosts(function(error,posts){

              if ( error){
                callback("database error")
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
          }
      }



}