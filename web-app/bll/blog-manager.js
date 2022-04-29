module.exports = function({
  blogRepository,
  forumRepository
  
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
                  }else {
                    blog["comments"]=comments
                  }
                  callback(error,blog)
                })
              
              }
            })

          },

          createComment(accountId,comment,callback){
            blogRepository.createComment(comment,function(error){
              callback(error)
            })
          },
          createBlog(accountId,blog,callback){
            blogRepository.createBlog(blog,function(error){
              callback(error)
            })
          }
      }



}