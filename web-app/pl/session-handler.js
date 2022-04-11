module.exports = function({constants}){

    return{
        getSessionAuthentication(session){

            if (session.isAdmin) {
                return constants.accountType.ADMIN
            }else if (session.isOrganization){
                return constants.accountType.ORGANIZATION
            }
        },

        setSessionAuthentication(session,accountType){

            switch (accountType) {
                case constants.accountType.ADMIN:
                    session.isAdmin = true
                    break
                case constants.accountType.ORGANIZATION:
                    session.isOrganization = true
                    break
                default:
            }              
        }

        
    }
}