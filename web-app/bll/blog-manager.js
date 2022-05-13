module.exports = function ({
  blogRepository,
  constants,
  errorCodes,
  validator

}) {

  return {

    getAllBlogs(accountType, callback) {

      if (accountType) {
        blogRepository.getAllBlogs(function (error, blogs) {

          if (error) {
            callback(errorCodes.DATABASE_ERROR)

          } else {
            callback(error, blogs)
          }
        })
      }
    },


    getAllBlogsByType(accountType, typeId, callback) {

      if(accountType){
        blogRepository.getAllBlogsByType(typeId, function (error, blogs) {

          if (error) {
            callback(errorCodes.DATABASE_ERROR)
          } else {
            callback(error, blogs)
  
          }
        })
      }


    },

    getBlog(blogId,accountId, callback) {

      if( accountId){
        blogRepository.getBlog(blogId, function (error, blog) {

          if (error) {
            callback(errorCodes.DATABASE_ERROR)

          } else {
            blogRepository.getBlogComments(blogId, function (error, comments) {

              if (error) {
                callback(errorCodes.DATABASE_ERROR)

              } else if (comments.length == 0) {
                blog["comments"] = []
                callback(error, blog)
  
              } else {
                blog["comments"] = comments
  
                function getAnswersReplies(comments, length) {

                  if (length == 0) {
                    callback(error, blog)
                    return
                  }
  
                  blogRepository.getAnswerReplies(comments[length - 1].AnswerId, function (error, replies) {

                    if (error) {
                      comments[length - 1]["replies"] = []
                    } else {
                      comments[length - 1]["replies"] = replies
  
                    }
  
                    getAnswersReplies(comments, length - 1)
  
                  })
                }
                getAnswersReplies(comments, comments.length)
  
              }
            })
  
          }
        })

      }else{
        callback(errorCodes.UNAUTHORIZED_USER)
      }
    },

    createComment(accountId, comment, callback) {
      
        if(accountId){
          blogRepository.createComment(comment, function (error) {
  
            if(error){
              callback(errorCodes.DATABASE_ERROR)
              
            }else{
              callback(error)
            }
          })
        }{
          callback(errorCodes.UNAUTHORIZED_USER_POST)
        }
    },

    createBlog(accountId, blog, callback) {
      const errors = validator.getBlogValidationErrors(blog)
      if(errors.length == 0){
        if( accountId == blog.accountId){

          blogRepository.createBlog(blog, function (error) {
  
            if(error){
              errors.push(errorCodes.DATABASE_ERROR)
              callback(errors)
  
            }else{
              callback(errors)
            }
          })
        }else{
          errors.push(errorCodes.UNAUTHORIZED_USER_POST)
          callback(errors)
        }
      }else{
        callback(errors)
      }


    },

    createReply(accountId, accountType, reply, callback) {
      blogRepository.createReply(reply, function (error) {
        callback(error)
      })
    }
  }



}