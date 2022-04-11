const express = require('express')

const session = require('express-session')


module.exports = function(
    {
        sessionHandler

    }){
     
    const router = express.Router()

    router.get('/', function(request, response){
        response.render('accounts-entry.hbs')
    })

    router.post('/login', function(request, response){

        request.session.accountId = "12"

        sessionHandler.setSessionAuthentication(request.session,"organization")
        response.render('home.hbs')

    })


    return router
    
}