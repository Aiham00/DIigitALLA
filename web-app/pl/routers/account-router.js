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

    router.get('/logout', function(request, response){
        response.render('accounts-entry.hbs')
    })

    router.post('/logout', function(request, response){
        delete request.session.accountId
        request.session.isAdmin = false
        request.session.isOrganization = false
        response.redirect('/')
    })

    router.get('/signup', function(request, response){
        response.render('account-sign-up.hbs')
    })

    router.post('/signup', function(request, response){

        response.redirect('/')
    })


    return router
    
}