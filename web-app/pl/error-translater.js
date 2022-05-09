module.exports = function({errorCodes,constants}){

    return{
        getErrorsFromTranslater(errorsIn){
            const errors = []
            for(let error of errorsIn){
                switch (error) {
                    case errorCodes.DATABASE_ERROR:
                        errors.push("Databasfel, snälla försök igen senare")
                            break
                    case errorCodes.UNAUTHORIZED_USER:
                        errors.push("Du är inte behörig att se den här komponenten, vänligen logga in")
                            break
                    case errorCodes.FIRST_NAME_SHORT:
                        errors.push("Förname måste vara minst "+constants.validationValues.MIN_NAME_LENGTH+" tecken")
                            break
                    case errorCodes.FIRST_NAME_LONG:
                        errors.push("Förname måste vara max "+constants.validationValues.MAX_NAME_LENGTH+" tecken")
                            break
                    case errorCodes.LAST_NAME_SHORT:
                        errors.push("Efternamn måste vara minst "+constants.validationValues.MIN_NAME_LENGTH+" tecken")
                            break
                    case errorCodes.LAST_NAME_LONG :
                        errors.push("Efternamn måste vara max "+constants.validationValues.MAX_NAME_LENGTH+" tecken")
                            break
                    case errorCodes.ORG_NAME_SHORT:
                        errors.push("Organisationnamn måste vara minst "+constants.validationValues.MIN_NAME_LENGTH+" tecken")
                            break
                    case errorCodes.ORG_NAME_LONG:
                        errors.push("Organisationnamn måste vara max "+constants.validationValues.MAX_NAME_LENGTH+" tecken")
                            break
                    case errorCodes.MOBILE_SHORT:
                        errors.push("TelefonNummer måste vara minst "+constants.validationValues.MIN_PHONE_LENGTH+" tecken")
                            break
                    case errorCodes.MOBILE_LONG:
                    errors.push("TelefonNummer måste vara max "+constants.validationValues.MAX_PHONE_LENGTH+" tecken")
                        break
                    case errorCodes.EMAIL_LONG:
                        errors.push("E-post måste vara max "+constants.validationValues.MAX_EMAIL_LENGTH+" tecken")
                            break
                    case errorCodes.EMAIL_SHORT:
                        errors.push("E-post måste vara minst "+constants.validationValues.MIN_EMAIL_LENGTH+" tecken")
                            break
                    case errorCodes.DESCRIPTON_LONG:
                        errors.push("Beskrivning av tidigare och planerade insatser måste vara max "+constants.validationValues.MAX_PHARAGRAP_LENGTH+" tecken")
                            break
                    case errorCodes.INTEREST_LONG:
                        errors.push("Verksamhets beskrivning måste vara max "+constants.validationValues.MAX_INTEREST_LENGTH+" tecken")
                            break
                    case errorCodes.PASSWORD_LONG:
                    errors.push("Lösenord måste vara max "+constants.validationValues.MAX_PASSWORD_LENGTH+" tecken")
                        break
                    case errorCodes.PASSWORD_SHORT:
                        errors.push("Lösenord måste vara minst "+constants.validationValues.MIN_PASSWORD_LENGTH+" tecken")
                            break
                    case errorCodes.PASSWORDS_CLASH:
                        errors.push("Lösenord och lösenord bekräftelse måste matcha varandra")
                            break
                    case errorCodes.EXISTED_EMAIL:
                        errors.push("Denna e-postadress är redan registrerad")
                            break
                    case errorCodes.UNEXISTED_USER:
                        errors.push("Denna e-postadress är inte registrerad")
                            break
                    case errorCodes.WRONG_PASSWORD:
                        errors.push("Fel lösenord. Försök igen")
                            break
                            
                    default:
                    errors.push("Oväntat fel, snälla försök igen senare")

                } 
            }
        return errors
        }
    }
}