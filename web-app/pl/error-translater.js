module.exports = function({errorCodes}){

    return{
         getErrorsFromTranslater(errorsIn){
            const errors = []
            for(let error of errorsIn){
                if(error == errorCodes.FIRST_NAME){
                    errors.push('Missing first name')
                }
                else if(error == errorCodes.LAST_NAME){
                    errors.push('Missing last name')
                }
                else if(error == errorCodes.MOBILE){
                    errors.push('Invalid moblie number')
                }
                else if(error == errorCodes.EMAIL){
                    errors.push('Invalid email')
                }
                else if(error == errorCodes.PASSWORD){
                    errors.push('Too weak password')
                }
                else if(error == errorCodes.PASSWORDS_CLASH){
                    errors.push('Passwords do not match')
                }
                else if(error == errorCodes.EXISTED_EMAIL){
                    errors.push('You entered an existed email')
                }
                else if (error == errorCodes.ORG_NAME){
                    errors.push('Organisation name missed')
                }
                else if(error == errorCodes.UNEXISTED_USER){
                    errors.push('Wrong email or password. try again')
                }
                else if(error == errorCodes.UNAUTHORIZED_USER){
                    errors.push("Sorry you don't have autherisation to reach this page. Please login!")
                }
                else if(error == errorCodes.EMPTY_COMPONENT){
                    errors.push("No element has been found to show in this page.")
                }else if(error == errorCodes.EVENT_TITLE){
                    errors.push('Title is missing')
                }else if(error == errorCodes.INVALID_DATE){
                    errors.push('You selected invalid date')
                }

                else{errors.push('Unexpexted error')}
            }
            
            return errors
         },
    }
}