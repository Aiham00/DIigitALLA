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
    router.get('/:id', function(request, response){
      const id = request.params.id
      forumManager.getPost(id,function(error,post){
        if(error){
          const model ={
            errorsMessages:[error]
          }
          response.render('forum-post-view.hbs',getForumLayoutModel(model))

        }else{
          console.log(post)
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