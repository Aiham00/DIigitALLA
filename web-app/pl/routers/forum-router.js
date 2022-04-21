const express = require('express')
const session = require('express-session')

const getForumLayoutModel = function(model){
model["layout"]='forum-layout.hbs'
return model

}
module.exports = function(
    {
        sessionHandler,
        forumManager

    }){
     
    const router = express.Router()

    router.get('/', function(request, response){
      forumManager.getAllPosts(1,function(error,posts){

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

      response.render('forum-post-create.hbs',getForumLayoutModel({}))

    })

    router.post('/create', function(request, response){

      response.redirect("/forum")

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

    router.get('/:id', function(request, response){
      const id = request.params.id
      forumManager.getPost(id,function(error,post){
        if(error){
          const model ={
            errorsMessages:[error]
          }
          response.render('forum-post-view.hbs',getForumLayoutModel(model))

        }else{
          const model = {
            errorsMessages:[],
            accountId: request.session.accountId,
            post
          }
          response.render('forum-post-view.hbs',getForumLayoutModel(model))

        }
      })

    })



    return router
    
}