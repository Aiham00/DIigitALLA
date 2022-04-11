const awilix = require('awilix')
const container = awilix.createContainer()

container.register({
    app                 : awilix.asFunction(require('./pl/app.js')),
    accountRouter       : awilix.asFunction(require('./pl/routers/account-router.js')),


})


container.resolve('app').listen(8080, function(){
    console.log('RUNNING')
})
