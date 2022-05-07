const express = require('express')
const session = require('express-session')

const getForumLayoutModel = function(model){
model["layout"]='main.hbs'
return model

}
module.exports = function(
    {
        sessionHandler,
        blogManager,
        forumManager,
        errorCodes,
        placeManager

    }){
     
    const router = express.Router()

    router.use(express.json())
    router.use(express.urlencoded({
      extended: false,
    }))


    router.post('/reply', function(request, response){
      const accountId = request.session.accountId
      const accountType =sessionHandler.setSessionAuthentication(request.session)

      const reply = {
        accountId:request.body.accountId,
        answerId:request.body.answerId,
        reply:request.body.reply
      }
      blogManager.createReply(accountId,accountType,reply,function(error){
        if(error){
          response.status(400).json([error])
        }else{
          response.setHeader("Location", "/answer/replays/"+reply.answerId)
          response.status(201).json(reply)
        }
      })  

    })


    router.get('/answer/reply/:id', function(request, response){
      const id = request.params.id
      const accountType =sessionHandler.setSessionAuthentication(request.session)
      forumManager.getAnswerReplies(accountType,id,function(error,answers){

        if(error){
          response.status(400).json([error])

        }else{
		      response.status(200).json(answers)
        }
      })

    })

    router.get('/places', function(request, response){
      const query = request.query
      placeManager.getAllPlaces(function(error,places){

        if(error){
          const model ={
            errorsMessages:[error]
          }
        }else{
          const model = {
            errorsMessages:[],
            places
          }

        }
      })

    })
    router.get('/places/search', function(request, response){
      const query = request.query
      placeManager.getPlacesSearchResult(query,function(error,places){

        if(error){
          response.status(400).json([error])

        }else{
          response.status(200).json(places)
        }
      })

    })

    return router
    
}