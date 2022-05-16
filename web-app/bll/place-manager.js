module.exports = function({
  placeRepository,
  constants,
  errorCodes,
  validator
  
}){

  return {

    getAllPlaces(callback){
      placeRepository.getAllPlaces(function(error,places){

        if (error){
          callback(errorCodes.DATABASE_ERROR)

        }else {
          callback(error,places)

        }
      })

    },

    getMyPlaces(accountId, callback){

      if(accountId){
        placeRepository.getMyPlaces(accountId, function(error,places){

          if ( error){
            callback(errorCodes.DATABASE_ERROR)
  
          }else {
            callback(error,places)
  
          }
        })

      }else{
        callback(errorCodes.UNAUTHORIZED_USER)
      }
    },

    getPlacesSearchResult(query,callback){
      const searchWords = query.q.split(' ')
      placeRepository.getPlacesSearchResult(searchWords,function(error,places){

        if ( error){
          callback(errorCodes.DATABASE_ERROR)

        }else {
          callback(error,places)

        }
      })
    },

    createPlace(accountId,place,callback){

      if(accountId == place.accountId){
        const errors = validator.getPlaceValidationErrors(place)
        if(errors.length == 0){
          placeRepository.createPlace(place,function(error){

            if ( error){
              errors.push(errorCodes.DATABASE_ERROR)  
            }
              callback(errors)

          })
        }else{
          callback(errors)
        }

      }else{
        callback([errorCodes.UNAUTHORIZED_USER])
      }
    }
  }
}