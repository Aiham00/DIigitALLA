module.exports = function ({
  forumRepository,
  blogRepository,
  constants,
  errorCodes,
  validator

}) {

  return {

    getAllPosts(accountType, callback) {
      if (accountType) {
        forumRepository.getAllPosts(function (error, posts) {

          if (error) {
            callback(errorCodes.DATABASE_ERROR)

          } else if (posts.length != 0) {

            function getPostsTags(posts, length) {

              if (length == 0) {
                callback(error, posts)
                return
              }

              forumRepository.getPostTags(posts[length - 1].Id, function (error, tags) {

                if (error) {
                  posts[length - 1]["tags"] = []

                } else {
                  posts[length - 1]["tags"] = tags
                }

                getPostsTags(posts, length - 1)

              })
            }
            getPostsTags(posts, posts.length)


          } else {
            callback(error, [])
          }
        })
      }
    },

    getAllPostsBelongToTag(accountType,tagId, callback) {
      if (accountType) {
        forumRepository.getAllPostsBelongToTag(tagId,function (error, posts) {

          if (error) {
            callback(errorCodes.DATABASE_ERROR)
            
          } else if (posts.length != 0) {

            function getPostsTags(posts, length) {

              if (length == 0) {
                callback(error, posts)
                return
              }

              forumRepository.getPostTags(posts[length - 1].Id, function (error, tags) {

                if (error) {
                  posts[length - 1]["tags"] = []

                } else {
                  posts[length - 1]["tags"] = tags
                }

                getPostsTags(posts, length - 1)

              })
            }
            getPostsTags(posts, posts.length)


          } else {
            callback(error, [])
          }
        })
      }
    },

    getPost(accountId,postId, callback) {
      forumRepository.getPost(postId, function (error, post) {

        if (error) {
          callback(errorCodes.DATABASE_ERROR)

        } else if (post) {
          forumRepository.getPostTags(post.Id, function (error, tags) {
            if (error) {
              post["tags"] = []
            } else {
              post["tags"] = tags
            }
            forumRepository.getPostAnswers(post.Id, function (error, answers) {
              if (error) {
                post["answers"] = []
              } else {
                post["answers"] = answers
              }
              callback(error, post)
            })
          })

        } else {
          callback(error, {})

        }
      })

    },

    createAnswer(accountType,answer, callback) {

      if(accountType){
        const errors = validator.gettAnswerValidationErrors(answer)

        if(errors.length == 0){

          forumRepository.createAnswer(answer, function (error) {

            if ( error){
              errors.push(errorCodes.DATABASE_ERROR)
            }
            callback(errors)
          })

        }else{
          callback(errors)
        }

      }else{
        callback([errorCodes.UNAUTHORIZED_USER])
      }
    },

    createPost(accountId, accountType, post, callback) {
      const errors = validator.getforumPostValidationErrors(post)

      if(errors.length == 0){
        if ( accountId == post.accountId) {
          forumRepository.createPost(post, function (error) {
  
            if (error) {
              errors.push(errorCodes.DATABASE_ERROR)
            }
              callback(errors)
          })

        } else {
          errors.push(errorCodes.UNAUTHORIZED_USER)
          callback(errors)
        }

      }else{
        callback(errors)
      }
    },

    getAnswerReplies(accountType, answerId, callback) {
      if (accountType == constants.ORGANIZATION) {
        blogRepository.getAnswerReplies(answerId, function (error, replies) {

          if (error) {
            callback([error])

          } else {
            callback(error, replies)
          }
        })
      } else {
        callback([errorCodes.UNAUTHORIZED_USER])
      }

    }
  }



}