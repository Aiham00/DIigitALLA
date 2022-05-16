module.exports = function(){
    return {
        accountType :{
            ORGANIZATION      : 'organization',
            ADMIN             : 'admin',
        },
        validationValues:{
            MIN_NAME_LENGTH         : 2,
            MAX_NAME_LENGTH         : 25,
            MIN_PHONE_LENGTH        : 7,
            MAX_PHONE_LENGTH        : 20,
            MIN_EMAIL_LENGTH        : 8,
            MAX_EMAIL_LENGTH        : 100,
            MAX_PHARAGRAP_LENGTH    : 2000,
            MIN_PASSWORD_LENGTH     : 8,
            MAX_PASSWORD_LENGTH     : 64,
            MAX_TITLE_LENGTH        : 100,
            MAX_BODY_LENGTH         :500,
            MAX_ANSWER_LENGTH       :255,
            MIN_LATLNG_LENGTH       :1,
            MAX_LATLNG_LENGTH       :25,
            MIN_PLACE_TYPE_LENGTH   :2,
            MAX_PLACE_TYPE_LENGTH   :25,
            MAX_LINK_LENGTH         :255,
            MAX_NOTE_LENGTH         :255,
            MAX_ADDRESS_LENGTH      :255,
            MIN_ADDRESS_LENGTH      :8,
            
        },
    } 
     
}
