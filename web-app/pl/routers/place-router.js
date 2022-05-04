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
        placeManager

    }){
     
    const router = express.Router()

    router.get('/', function(request, response){
      placeManager.getAllPlaces(function(error,places){

        if(error){
          const model ={
            errorsMessages:[error]
          }
          response.render('home.hbs',model)
        }else{
          const model = {
            errorsMessages:[],
            places
          }
console.log(places)
          response.render('home.hbs',model)

        }
      })

    })

    router.get('/create', function(request, response){
      const model = {
        accountId: request.session.accountId
      }

      response.render('place-create.hbs', model)

    })

    router.post('/create', function(request, response){
      const accountId = request.session.accountId
      placeManager.createPlace(accountId,request.body,function(error){
        if(error){
console.log(error)

        }else{
          response.redirect("/")
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