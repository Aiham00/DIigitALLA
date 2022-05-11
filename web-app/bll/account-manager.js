const bcrypt = require('bcrypt')
module.exports = function({
  accountRepository,
  constants,
  errorCodes,
  validator
}){

      return {

        getAllAccounts(accountId, accountType, callback){

          if(accountType){
            accountRepository.getAllAccounts(function(error,accounts){

              if ( error){
                callback(errorCodes.DATABASE_ERROR)

              }else{
                callback(error,accounts)
              }
            })

          }else{
            callback(errorCodes.UNAUTHORIZED_USER)
          }
        },

        getAllAccountsByType(accountType,catId,callback){
          if(accountType){
            accountRepository.getAllAccountsByType(catId,function(error,accounts){

              if ( error){
                callback(errorCodes.DATABASE_ERROR)

              }else{
                callback(error,accounts)
              }
            })

          }else{
            callback(errorCodes.UNAUTHORIZED_USER)     
          }
        },

        getAllInactiveAccounts(AccountType,callback){
        accountRepository.getAllInactiveAccounts(function(error,accounts){

            if ( error){
              callback("database error")
            }else{
              callback(error,accounts)
            
            }
          })

        },

        getAccount(id,accountId,isActive,callback){
          accountRepository.getAccount(id,isActive,function(error,account){

            if ( error){
              callback("database error")
            }else if(account){
              if (accountId == id){
                account["isMin"]="true"
                callback(error,account)
              }else{
                callback(error,account)
              }
            }else{
              callback("no account")
            }
          })

        },

        createAccount(account,callback){
          const errors = validator.validateAccountInformation(account)
          if(errors.length){
            callback(errors)

          }else{
            const passwordHash = bcrypt.hashSync(account.password, 10)
            const passwordHashKey = 'hashedPassword'            
            account[passwordHashKey] = passwordHash
            delete account.password
            accountRepository.createAccount(account,function(error,accountId){

              if (error){

                if(error.errno==19){
                  errors.push(errorCodes.EXISTED_EMAIL)
                }
                callback(errors)
                
              }else{
                callback(errors,accountId)
              }

            })
          }

        },

        authorizeLogIn(loginModel ,callback){
          const errors = []
          accountRepository.getAccoutByEmail(loginModel, function(error, account){

            if(error){
              errors.push(errorCodes.DATABASE_ERROR)
              callback(errors)

            }else if(!account){
              errors.push(errorCodes.UNEXISTED_USER)
              callback(errors)

            }else{
              const passwordHash = account.HashedPassowrd

              const bcryptResponse = bcrypt.compareSync(loginModel.password, passwordHash)
              if(!bcryptResponse){
                errors.push(errorCodes.WRONG_PASSWORD)
                callback(errors)

              }else{
                const accountId = account.AccountId
                if(account.isAdmin == "1"){
                    callback(errors,accountId,constants.accountType.ADMIN)

                }else{
                    callback(errors,accountId,constants.accountType.ORGANIZATION)
                }

                }
              }
          })
        },

          deleteAccount(accountId,accountType,account,callback){
            if(accountId ==account.accountId || accountType == constants.accountType.ADMIN){
              accountRepository.deleteAccount(accountId,function(error){
                callback(error)
              })
            }else{
              callback(errorCodes.UNAUTHORIZED_USER)
            }
          },

          activateAccount(accountId,accountType,callback){
            accountRepository.activateAccount(accountId,function(error){
              callback(error)
            })
          },

          decactivateAccount(accountId,accountType,callback){
            accountRepository.decactivateAccount(accountId,function(error){
              callback(error)
            })
          }
      }



}