const express = require('express')
const session = require('express-session')

const getForumLayoutModel = function(model){
model["layout"]='forum-layout.hbs'
return model

}
module.exports = function(
    {
        sessionHandler,
        forumManager,
        errorsTranslator

    }){
     
    const router = express.Router()

    router.get('/', function(request, response){
      const accountType = sessionHandler.getSessionAuthentication(request.session) 
      forumManager.getAllPosts(accountType,function(error,posts){

        if(error){
          const model ={
            errorsMessages: errorsTranslator.getErrorsFromTranslater([error]),
          }
          response.render('forum-posts.hbs',getForumLayoutModel(model))

        }else{
          const model = {
            errorsMessages:[],
            posts
          }
          response.render('forum-posts.hbs',getForumLayoutModel(model))

        }
      })

    })

    router.get('/create', function(request, response){
      const accountId = request.session.accountId

      response.render('forum-post-create.hbs',getForumLayoutModel({accountId}))

    })

    router.post('/create', function(request, response){
      const accountId = request.session.accountId
      const accountType = sessionHandler.setSessionAuthentication(request.session)
      forumManager.createPost(accountId,accountType,request.body,function(errors){
        if(errors.length !=0){

          const errorsMessages = errorsTranslator.getErrorsFromTranslater(errors)
          const model = request.body
          model["errorsMessages"] = errorsMessages
          response.render('forum-post-create.hbs',getForumLayoutModel(model))

        }else{
          response.redirect("/forum")

        }
      })

    })

    router.post('/answer', function(request, response){

      const postId = request.body.postId
      const accountType = sessionHandler.getSessionAuthentication(request.session)

      forumManager.createAnswer(accountType,request.body,function(errors){
        
        if(errors.length !=0){
          const accountId = request.session.accountId
          forumManager.getPost(accountId,postId,function(error,post){

            if(error){

              const model ={
                errorsMessages: errorsTranslator.getErrorsFromTranslater([error]),
                accountId,
                post: request.body
              }
              response.render('forum-post-view.hbs',getForumLayoutModel(model))
            }else{

              const model = {
                errorsMessages: errorsTranslator.getErrorsFromTranslater(errors),
                accountId,
                answer: request.body.answer,
                post
              }
              response.render('forum-post-view.hbs',getForumLayoutModel(model))
    
            }
          })

        }else{

          response.redirect("/forum/"+postId)
        }

      })

    })

    router.get('/tags/:id', function(request, response){
      const tagId = request.params.id
      const accountType = sessionHandler.getSessionAuthentication(request.session) 
      forumManager.getAllPostsBelongToTag(accountType,tagId,function(error,posts){

        if(error){
          const model ={
            errorsMessages:errorsTranslator.getErrorsFromTranslater([error])
          }
          response.render('accounts-entry.hbs',getForumLayoutModel(model))
        }else{
          const model = {
            errorsMessages:[],
            posts
          }
          response.render('forum-posts.hbs',getForumLayoutModel(model))

        }
      })
    })

    router.get('/:id', function(request, response){
      const accountId = request.session.accountId
      const postId = request.params.id
      forumManager.getPost(accountId,postId,function(error,post){

        if(error){
          const model ={
            errorsMessages: errorsTranslator.getErrorsFromTranslater([error])
          }
          response.render('forum-post-view.hbs',getForumLayoutModel(model))
        }else{
          const model = {
            errorsMessages:[],
            post
          }
          response.render('forum-post-view.hbs',getForumLayoutModel(model))

        }
      })

    })



    return router
    
}