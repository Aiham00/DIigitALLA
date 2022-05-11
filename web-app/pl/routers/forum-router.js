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
            errorsMessages:[error]
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

    router.get('/create', function(request, response){
      const accountId = request.session.accountId

      response.render('forum-post-create.hbs',getForumLayoutModel({accountId}))

    })

    router.post('/create', function(request, response){
      const accountId = request.session.accountId
      const accountType = sessionHandler.setSessionAuthentication(request.session)
      forumManager.createPost(accountId,accountType,request.body,function(errors){
        if(errors.length !=0){
console.log(errors)

          const errorsMessages = errorsTranslator.getErrorsFromTranslater(errors)
          const model = request.body
          model["errorsMessages"] = errorsMessages
          response.render('forum-post-create.hbs',getForumLayoutModel({model}))

        }else{
          response.redirect("/forum")

        }
      })

    })

    router.post('/answer', function(request, response){
      postId = request.body.postId
      forumManager.createAnswer(request.body,function(error){
        if(error){
console.log(error)

        }else{
          response.redirect("/forum/"+postId)
        }

      })

    })

    router.get('/tags/:id', function(request, response){
      const tagIg = request.params.id
      const accountId = request.session.accountId
      const accountType = sessionHandler.getSessionAuthentication(request.session) 
      forumManager.getAllPostsBelongToTag(accountId,accountType,tagIg,function(error,posts){

        if(error){
          const model ={
            errorsMessages:[error]
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
      forumManager.getAllPosts(accountId,function(error,posts){

        if(error){
          const model ={
            errorsMessages:[error]
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



    return router
    
}