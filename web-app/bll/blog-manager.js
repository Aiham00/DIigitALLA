module.exports = function({
  blogRepository
  
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

                callback(error,blog)
              
              }
            })

          },

          createBlog(accountId,blog,callback){
            blogRepository.createBlog(blog,function(error){
              callback(error)
            })
          }
      }



}