const express = require('express')

const session = require('express-session')


module.exports = function(
    {


    }){
     
    const router = express.Router()

    router.get('/', function(request, response){
        response.render('accounts-entry.hbs')
    })


    return router
    
}