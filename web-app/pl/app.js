const express = require('express')

const expressHandleBars = require('express-handlebars')
const path = require('path')

const session = require('express-session')
const connectSqlite = require('connect-sqlite3')
const SqliteSessionStore = connectSqlite(session)

module.exports = function(
    {
        accountRouter,
    }
    ){
        const app = express()
        app.use(express.urlencoded({ extended: false }))

        /*const { createClient } = require("redis")
        let redisClient = createClient({ legacyMode: true ,
            socket: {
                host: 'redis'
            }
        })*/
        //redisClient.connect().catch(console.error)

        app.use(session({
         //   store: new RedisStore({client: redisClient}),
            store: new SqliteSessionStore({ db: "session-db.db" }),
            secret: 'wqadeqwetgv',
            saveUninitialized: false,
            resave: false,

        }))
        app.use(express.static(path.join(__dirname, 'public')))
        
        app.engine('hbs', expressHandleBars.engine({
            defaultLayout: 'main.hbs',
            layoutsDir: path.join(__dirname, 'layouts')
        }))
        app.use(function (request, response, next) {
            response.locals.session = request.session
            next()
        })
        app.set('views', path.join(__dirname, "views"))
        

        app.use('/auth', accountRouter)

        app.get('/', function(req, res){
                res.render('home.hbs')


        })


        return app
}