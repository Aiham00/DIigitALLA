module.exports = function({
  forumRepository,
  placeRepository
  
}){

      return {

        getAllPlaces(callback){
          placeRepository.getAllPlaces(function(error,places){

            if ( error){
              callback("database error")
            }else {
              callback(error,places)

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

          createPlace(accountId,place,callback){
            placeRepository.createPlace(place,function(error){
              callback(error)
            })
          }
      }



}