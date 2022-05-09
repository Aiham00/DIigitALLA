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
      placeRepository.createPlace(place,function(error){
        callback(error)
      })
    }
  }



}