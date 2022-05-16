module.exports = function({
  placeRepository,
  constants,
  errorCodes
  
}){

  return {

    getAllPlaces(callback){
      placeRepository.getAllPlaces(function(error,places){

        if ( error){
          callback("database error")
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
        placeRepository.createPlace(place,function(error){
          if ( error){
            callback(errorCodes.DATABASE_ERROR)
          }else{
            callback(error)

          }
        })
      }

    }
  }



}