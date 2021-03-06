module.exports = function ({ errorCodes,constants }) {

    return {
        validateAccountInformation(accountSignupModel) {

            const validationErrors = []
            if (accountSignupModel.firstName.length < constants.validationValues.MIN_NAME_LENGTH) {
                validationErrors.push(errorCodes.FIRST_NAME_SHORT)
            }
            if (accountSignupModel.firstName.length > constants.validationValues.MAX_NAME_LENGTH) {
                validationErrors.push(errorCodes.FIRST_NAME_LONG)
            }
            if (accountSignupModel.lastName.length < constants.validationValues.MIN_NAME_LENGTH) {
                validationErrors.push(errorCodes.LAST_NAME_SHORT)
            }
            if (accountSignupModel.lastName.length > constants.validationValues.MAX_NAME_LENGTH) {
                validationErrors.push(errorCodes.LAST_NAME_LONG)
            }
            if (accountSignupModel.org.length < constants.validationValues.MIN_NAME_LENGTH) {
                validationErrors.push(errorCodes.ORG_NAME_SHORT)
            }
            if (accountSignupModel.org.length > constants.validationValues.MAX_NAME_LENGTH) {
                validationErrors.push(errorCodes.ORG_NAME_LONG)
            }
            if (accountSignupModel.phone.length < constants.validationValues.MIN_PHONE_LENGTH) {
                validationErrors.push(errorCodes.PHONE_SHORT)
            }
            if (accountSignupModel.phone.length > constants.validationValues.MAX_PHONE_LENGTH) {
                validationErrors.push(errorCodes.PHONE_LONG)
            }
            if (accountSignupModel.email.length > constants.validationValues.MAX_EMAIL_LENGTH ) {
                validationErrors.push(errorCodes.EMAIL_LONG)
            }
            if (accountSignupModel.email.length < constants.validationValues.MIN_EMAIL_LENGTH ) {
                validationErrors.push(errorCodes.EMAIL_SHORT)
            }
            if (!parseInt(accountSignupModel.accountType)) {
                validationErrors.push(errorCodes.TYPE_OUT_OF_RANGE)
            }
            if (accountSignupModel.description.length > constants.validationValues.MAX_PARAGRAPH_LENGTH) {
                validationErrors.push(errorCodes.DESCRIPTON_LONG)
            }
            if (accountSignupModel.interest.length < constants.validationValues.MAX_PARAGRAPH_LENGTH) {
                validationErrors.push(errorCodes.INTEREST_LONG)
            }
            if (accountSignupModel.password.length >  constants.validationValues.MAX_PASSWORD_LENGTH) {
                validationErrors.push(errorCodes.PASSWORD_LONG)
            }
            if (accountSignupModel.password.length < constants.validationValues.MIN_PASSWORD_LENGTH) {
                validationErrors.push(errorCodes.PASSWORD_SHORT)
            }
            if (accountSignupModel.rePassword != accountSignupModel.password) {
                validationErrors.push(errorCodes.PASSWORDS_CLASH)
            }
            return validationErrors

        },

        getPlaceValidationErrors(place) {

            const validationErrors = []
            if (place.name.length < constants.validationValues.MIN_NAME_LENGTH) {
                validationErrors.push(errorCodes.NAME_SHORT)
            }
            if (place.name.length > constants.validationValues.MAX_NAME_LENGTH) {
                validationErrors.push(errorCodes.NAME_LONG)
            }
            if (place.lat.length < constants.validationValues.MIN_LATLNG_LENGTH) {
                validationErrors.push(errorCodes.LAT_SHORT)
            }
            if (place.lat.length > constants.validationValues.MAX_LATLNG_LENGTH) {
                validationErrors.push(errorCodes.LAT_LONG)
            }
            if (place.lng.length < constants.validationValues.MIN_LATLNG_LENGTH) {
                validationErrors.push(errorCodes.LNG_SHORT)
            }
            if (place.lng.length > constants.validationValues.MAX_LATLNG_LENGTH) {
                validationErrors.push(errorCodes.LNG_LONG)
            }
            if (place.phone.length < constants.validationValues.MIN_PHONE_LENGTH) {
                validationErrors.push(errorCodes.PHONE_SHORT)
            }
            if (place.phone.length > constants.validationValues.MAX_PHONE_LENGTH) {
                validationErrors.push(errorCodes.PHONE_LONG)
            }
            if (place.type.length < constants.validationValues.MIN_PLACE_TYPE_LENGTH) {
                validationErrors.push(errorCodes.PLACE_TYPE_SHORT)
            }
            if (place.type.length > constants.validationValues.MAX_PLACE_TYPE_LENGTH) {
                validationErrors.push(errorCodes.PLACE_TYPE_LONG)
            }
            if (place.link.length > constants.validationValues.MAX_LINK_LENGTH ) {
                validationErrors.push(errorCodes.LINK_LONG)
            }
            if (place.note.length < constants.validationValues.MAX_NOTE_LENGTH) {
                validationErrors.push(errorCodes.NOTE_LONG)
            }
            if (place.address.length >  constants.validationValues.MAX_ADDRESS_LENGTH) {
                validationErrors.push(errorCodes.ADDRESS_LONG)
            }
            if (place.address.length < constants.validationValues.MIN_ADDRESS_LENGTH) {
                validationErrors.push(errorCodes.ADDRESS_SHORT)
            }
            if (place.kommun.length >  constants.validationValues.MAX_NAME_LENGTH) {
                validationErrors.push(errorCodes.KOMMUN_LONG)
            }
            if (place.kommun.length < constants.validationValues.MIN_NAME_LENGTH) {
                validationErrors.push(errorCodes.KOMMUN_SHORT)
            }

            return validationErrors

        },

        getforumPostValidationErrors(post) {
            const validationErrors = []

            if (post.title.length == 0) {
                validationErrors.push(errorCodes.MISSED_TITLE)
            }else if(post.title.length > constants.validationValues.MAX_TITLE_LENGTH){
                validationErrors.push(errorCodes.LONG_TITLE)
            }
            if (post.body.length == 0){
                validationErrors.push(errorCodes.MISSED_BODY)

            }else if (post.body.length > constants.validationValues.MAX_BODY_LENGTH){
                validationErrors.push(errorCodes.LONG_BODY)
            }
            if (!parseInt(post.type)) {
                validationErrors.push(errorCodes.TYPE_OUT_OF_RANGE)
            }

            return validationErrors

        },

        gettAnswerValidationErrors(answer) {
            const validationErrors = []

            if (answer.answer.length == 0) {
                validationErrors.push(errorCodes.MISSED_ANSWER)
            }else if(answer.answer.length > constants.validationValues.MAX_ANSWER_LENGTH){
                validationErrors.push(errorCodes.LONG_ANSWER)
            }

            return validationErrors

        },

        

        getBlogValidationErrors(blog) {
            const validationErrors = []

            if (blog.title.length == 0) {
                validationErrors.push(errorCodes.MISSED_TITLE)
            }else if(blog.title.length >constants.validationValues.MAX_TITLE_LENGTH){
                validationErrors.push(errorCodes.LONG_TITLE)
            }
            if (!parseInt(blog.type)) {
                validationErrors.push(errorCodes.TYPE_OUT_OF_RANGE)
            }
            for(let i = 1; i < blog.paragraph.length; i++ ){
                if (blog.paragraph[i].length > constants.validationValues.MAX_PARAGRAPH_LENGTH){
                    validationErrors.push(errorCodes.PARAGRAPH_LONG)
                }
                if(blog.paragraph[i].length == 0){
                    if(blog.linkTitle[i] == 0 || blog.link[i].length == 0){
                        validationErrors.push(errorCodes.PARAGRAPH_EMPTY)
                    }
                }
            }
            return validationErrors
        },


    }
    
}