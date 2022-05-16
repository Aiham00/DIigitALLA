const express = require('express')
const session = require('express-session')

const getForumLayoutModel = function(model){
model["layout"]='forum-layout.hbs'
return model

}
module.exports = function(
    {

        placeManager,
        errorsTranslator

    }){
     
    const router = express.Router()

    router.get('/create', function(request, response){
      const model = {
        accountId: request.session.accountId
      }

      response.render('place-create.hbs', model)

    })

    router.post('/create', function(request, response){
      const accountId = request.session.accountId
      const error = true
      placeManager.createPlace(accountId,request.body,function(error){
        if(error){
          const model = {
            errorsMessages:errorsTranslator.getErrorsFromTranslater([error]),
            place:request.body,
            accountId:request.body.accountId

          }
          response.render('place-create.hbs', model)

        }else{
          response.redirect("/")
        }

      })
    })

    router.get('/my-places', function (request, response) {
      const accountId = request.session.accountId
  
      placeManager.getMyPlaces(accountId, function (error,places) {
  
        if (error) {
          const model = {
            errorsMessages: errorsTranslator.getErrorsFromTranslater([error])
          }
          response.render('my-places.hbs',model)
  
        } else {
          const model ={
            errorsMessages: [],
            places
          }
          response.render('my-places.hbs',model)
  
        }
      })
    })


    return router
    
}