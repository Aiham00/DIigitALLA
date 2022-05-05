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

  router.get('/accounts/cat/:id', function (request, response) {
    const accountId = 1
    const typeId = request.params.id
    accountManager.getAllAccountsByType(accountId,typeId, function (error,accounts) {

      if (error) {
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
    if(request.body.email=="aiham682@hotmail.com"){
      request.session.accountId = "2"

      sessionHandler.setSessionAuthentication(request.session, "admin")
      sessionHandler.setSessionAuthentication(request.session, "organization")
      response.render('home.hbs')
    }else{
      request.session.accountId = "1"

      sessionHandler.setSessionAuthentication(request.session, "organization")
      response.render('home.hbs')
    }

 

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

  router.get('/delete/:id', function (request, response) {
    const id = request.params.id
    const model={
      id
    }
    response.render('account-delete.hbs',model)
  })

  router.get('/activate/:id', function (request, response) {
    const id = request.params.id
    const model={
      id
    }
    response.render('account-activate.hbs',model)
  })

  router.get('/decactivate/:id', function (request, response) {
    const id = request.params.id
    const model={
      id
    }
    response.render('account-decactivate.hbs',model)
  })

  router.post('/delete', function (request, response) {
    const accountId = request.body.accountId
    const accountType = sessionHandler.getSessionAuthentication(request.session) 
    accountManager.deleteAccount(accountId,accountType, function (error) {
      if (error) {
console.log(error)

      } else {
        response.redirect('/auth/inactive-accounts')

      }
    })
  })

  router.post('/activate', function (request, response) {
    const accountId = request.body.accountId
    const accountType = sessionHandler.getSessionAuthentication(request.session) 
    accountManager.activateAccount(accountId,accountType, function (error) {
      if (error) {
console.log(error)

      } else {
        response.redirect('/auth/'+accountId)

      }
    })
  })

  router.post('/decactivate', function (request, response) {
    const accountId = request.body.accountId
    const accountType = sessionHandler.getSessionAuthentication(request.session) 
    accountManager.decactivateAccount(accountId,accountType, function (error) {
      if (error) {
console.log(error)

      } else {
        response.redirect('/auth/inactive-accounts/'+accountId)

      }
    })
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
    const isActive = 1
    accountManager.getAccount(accountId,accountId,isActive,function(error,account){
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

  router.get('/inactive-accounts', function(request, response){
    const accountType = sessionHandler.getSessionAuthentication(request.session) 
    accountManager.getAllInactiveAccounts(accountType, function (error,accounts) {

      if (error) {
console.log(error)

      }else if (!accounts.length){
console.log(error)

      } else {
        const model ={
          errorsMessages:[],
          accounts
        }
        response.render('inactive-accounts.hbs',model)

      }
    })

  })

  router.get('/inactive-accounts/:id', function(request, response){
    const id = request.params.id
    const accountId = request.session.accountId 
    const isActive = 0
    accountManager.getAccount(id,accountId,isActive,function(error,account){
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
    const isActive = 1
    accountManager.getAccount(id,accountId,isActive,function(error,account){
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