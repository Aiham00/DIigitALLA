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
                validationErrors.push(errorCodes.MOBILE_SHORT)
            }
            if (accountSignupModel.phone.length > constants.validationValues.MAX_PHONE_LENGTH) {
                validationErrors.push(errorCodes.MOBILE_LONG)
            }
            if (accountSignupModel.email.length > constants.validationValues.MAX_EMAIL_LENGTH ) {
                validationErrors.push(errorCodes.EMAIL_LONG)
            }
            if (accountSignupModel.email.length < constants.validationValues.MIN_EMAIL_LENGTH ) {
                validationErrors.push(errorCodes.EMAIL_SHORT)
            }
            if (!parseInt(accountSignupModel.accountType)) {
                validationErrors.push(errorCodes.ACCOUNT_TYPE_OUT_OF_RANGE)
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

        validateOrganizerInformation(organizerInformationModel) {
            const validationErrors = []



            const accountvalidation = validateAccount(organizerInformationModel)
            const allErrors = validationErrors.concat(accountvalidation)
            return allErrors

        },


        validateCreateEvent(event) {
            const validationErrors = []

            if (event.title.length == 0) {
                validationErrors.push(errorCodes.MISSED_TITLE)
            }

            const validStartDate = validateEventInputDate(event.startDate)
            const validateEndDate = validateEventInputDate(event.endDate)
            if (!(validStartDate && validateEndDate)) {
                validationErrors.push(errorCodes.INVALID_DATE)
            }
            return validationErrors
        },

        validatereatApplication(application) {
            const validationerrors = []
            if (application.note.length > 255) {
                validationerrors.push(errorCodes.LONG_NOTE_ERROR)
            }
            return validationerrors
        }


    }

    function validateAccount(informationModel) {
        const errors = []
        if (informationModel.mobile.length < 10) {
            errors.push(errorCodes.MISSED_MOBILE)
        }
        if (informationModel.email.length < 10) {
            errors.push(errorCodes.EMAIL)
        }
        if (informationModel.password.length < 8) {
            errors.push(errorCodes.PASSWORD)
        } else if (informationModel.passwordRepeat != informationModel.password) {
            errors.push(errorCodes.PASSWORDS_CLASH)
        }
        return errors
    }

    function validateEventInputDate(date) {
        let today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const year = today.getFullYear();

        let dateSplitted = date.split('-')
        const yearFromEvent = dateSplitted[0]
        const monthFromEvent = dateSplitted[1]
        const dayFromEvent = dateSplitted[2]

        if ((day == dayFromEvent || day < dayFromEvent) &&
            (month == monthFromEvent || month < monthFromEvent) &&
            (year == yearFromEvent || year < yearFromEvent)) {

            return true
        } else {
            return false
        }
    }
}