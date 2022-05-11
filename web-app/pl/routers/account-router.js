const express = require('express')


const session = require('express-session')


module.exports = function (
  {
    sessionHandler,
    accountManager,
    errorsTranslator


  }) {

  const router = express.Router()

  router.get('/accounts', function (request, response) {
    const accountId = request.session.accountId
    const accountTyoe = sessionHandler.getSessionAuthentication(request.session)

    accountManager.getAllAccounts(accountId, accountTyoe, function (error,accounts) {

      if (error) {
        const model = {
          errorsMessages: errorsTranslator.getErrorsFromTranslater([error])
        }
        response.render('accounts.hbs',model)

      } else {
        const model ={
          errorsMessages: [],
          accounts
        }
        response.render('accounts.hbs',model)

      }
    })
  })

  router.get('/accounts/cat/:id', function (request, response) {
    const accountType = sessionHandler.getSessionAuthentication(request.session)
    const catId = request.params.id
    accountManager.getAllAccountsByType(accountType,catId, function (error,accounts) {

      if (error) {
        const model = {
          errorsMessages: errorsTranslator.getErrorsFromTranslater([error])
        }
        response.render('accounts.hbs',model)

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
    const loginModel = {
      email: request.body.email,
      password: request.body.password
    }

    accountManager.authorizeLogIn(loginModel ,function(errors, id,accountType){

      if(errors.length){
        const errorsMessages = errorsTranslator.getErrorsFromTranslater(errors)
        const model = {
            errorsMessages
        }
        response.render('accounts-entry.hbs', model)
          
      }else{
        request.session.accountId = id
        sessionHandler.setSessionAuthentication(request.session,accountType)
        response.redirect('/')
      }  
    })
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
    accountManager.createAccount(request.body, function (errors) {

      if (errors.length) {
        const model={
          errorsMessages:errorsTranslator.getErrorsFromTranslater(errors),
          account:request.body

        }
        response.render('account-sign-up.hbs',model)
      } else {
        response.redirect('/')

      }
    })
  })

  router.get('/delete/:id', function (request, response) {
    const id = request.params.id
    const model={
      id,
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
    const accountId = request.session.accountId
    const accountType = sessionHandler.getSessionAuthentication(request.session)
    const account = request.body 
    accountManager.deleteAccount(accountId,accountType, account, function (error) {

      if (error) {
        const model={
          errorsMessages:errorsTranslator.getErrorsFromTranslater([error]),
          account:request.body
        }
        response.render('account-delete.hbs',model)
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