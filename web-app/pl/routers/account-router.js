const express = require('express')


const session = require('express-session')


module.exports = function (
  {
    sessionHandler,
    accountManager

  }) {

  const router = express.Router()

  router.get('/accounts', function (request, response) {
    const accountId = 1
    accountManager.getAllAccounts(accountId, function (error,accounts) {

      if (error) {
console.log(error)

      }else if (!accounts.length){
console.log(error)

      } else {
        const model ={
          errorsMessages:[],
          accounts
        }
        response.render('accounts.hbs',model)

      }
    })
  })

  router.get('/loggin', function (request, response) {
    response.render('accounts-entry.hbs')
  })

  router.post('/login', function (request, response) {

    request.session.accountId = "1"

    sessionHandler.setSessionAuthentication(request.session, "organization")
    response.render('home.hbs')

  })

  router.get('/logout', function (request, response) {
    response.render('accounts-entry.hbs')
  })

  router.post('/logout', function (request, response) {
    delete request.session.accountId
    request.session.isAdmin = false
    request.session.isOrganization = false
    response.redirect('/')
  })

  router.get('/signup', function (request, response) {
    response.render('account-sign-up.hbs')
  })

  router.post('/signup', function (request, response) {
    accountManager.createAccount(request.body, function (error) {
      if (error) {
        console.log(error)
      } else {
        response.redirect('/')

      }
    })
  })

  router.get('/my-account', function(request, response){
    const accountId = request.session.accountId 
    accountManager.getAccount(accountId,accountId,function(error,account){
      if(error){
        const model ={
          errorsMessages:[error]
        }
        response.render('account-view.hbs',model)

      }else{
        const model = {
          errorsMessages:[],
          account
        }
        response.render('account-view.hbs',model)

      }
    })

  })

  router.get('/:id', function(request, response){
    const id = request.params.id
    const accountId = request.session.accountId 
    accountManager.getAccount(id,accountId,function(error,account){
      if(error){
        const model ={
          errorsMessages:[error]
        }
        response.render('account-view.hbs',model)

      }else{
        const model = {
          errorsMessages:[],
          account
        }
        response.render('account-view.hbs',model)

      }
    })

  })


  return router

}