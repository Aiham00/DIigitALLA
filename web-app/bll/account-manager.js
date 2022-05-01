module.exports = function({
  blogRepository,
  accountRepository
  
}){

      return {

        getAllAccounts(AccountId,callback){
          accountRepository.getAllAccounts(function(error,accounts){

              if ( error){
                callback("database error")
              }else{
                callback(error,accounts)
              
              }
            })

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
            account['hashedPassword'] = account.password
            delete account.password

            accountRepository.createAccount(account,function(error){

              callback(error)
            })
          },
          createBlog(accountId,blog,callback){
            blogRepository.createBlog(blog,function(error){
              callback(error)
            })
          },

          createRebly(accountId,rebly,callback){
            blogRepository.createRebly(rebly,function(error){
              callback(error)
            })
          }
      }



}