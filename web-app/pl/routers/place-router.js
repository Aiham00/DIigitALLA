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
          const model = {
            errorsMessages:errorsTranslator.getErrorsFromTranslater([error]),
            place:request.body

          }
          response.render('place-create.hbs', model)

        }else{
          response.redirect("/")
        }

      })
    })


    return router
    
}