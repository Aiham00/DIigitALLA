const awilix = require('awilix')
const container = awilix.createContainer()

container.register({
    app                 : awilix.asFunction(require('./pl/app.js')),
    accountRouter       : awilix.asFunction(require('./pl/routers/account-router.js')),
    sessionHandler      : awilix.asFunction(require('./pl/session-handler.js')),
    constants           : awilix.asFunction(require('./constants.js')),
    forumRouter         : awilix.asFunction(require('./pl/routers/forum-router.js')),
    forumRepository     : awilix.asFunction(require('./dal/forum-repository.js')),
    dbConnection        : awilix.asFunction(require('./dal/db-connection.js')),
    forumManager        : awilix.asFunction(require('./bll/forum-manager.js')),
    blogRouter          : awilix.asFunction(require('./pl/routers/blog-router.js')),
    blogManager         : awilix.asFunction(require('./bll/blog-manager.js')),
    blogRepository      : awilix.asFunction(require('./dal/blog-repository.js'))


})


container.resolve('app').listen(8080, function(){
    console.log('RUNNING')
})
