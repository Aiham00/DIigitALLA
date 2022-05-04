module.exports = function(){
  const errorCodes = {
      FIRST_NAME              : 'MISSED_FIRST_NAME',
      LAST_NAME               : 'MISSED_LAST_NAME',
      ORG_NAME                : 'ORG_NAME_MISSED',
      EMAIL                   : 'INVALID_EMAIL',
      EXISTED_EMAIL           : 'EXISTED_EMAIL',
      PASSWORD                : 'INVALID_PASSWORD',
      PASSWORDS_CLASH         : 'PASSWORDS_CLASH',
      DATABASE_ERROR          : 'DATABASE_ERROR',
      MISSED_TITLE            : 'EVENT_TITLE',
      INVALID_DATE            : 'INVALID_DATE',
      UNEXISTED_USER          : 'UNEXISTED_USER',
      EMPTY_COMPONENT         : 'EMPTY_COMPONENT',
      UNAUTHORIZED_USER       : 'UNAUTHORIZED_USER',
      INVALID_MOBILE_NUMBER   : 'INVALID_MOBILE_NUMBER',
      LONG_NOTE_ERROR         : 'UNEXISTED_USER',
      VOLUNTEER_REQUIRED_ERROR: 'VOLUNTEER_REQUIRED_ERROR'


  }
  return errorCodes
}