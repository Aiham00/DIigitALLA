const express = require('express')
const session = require('express-session')

const getForumLayoutModel = function(model){
model["layout"]='main.hbs'
return model

}
module.exports = function(
    {
        sessionHandler,
        blogManager,
        errorCodes

    }){
     
    const router = express.Router()

    router.use(express.json())
    router.use(express.urlencoded({
      extended: false,
    }))
    router.get('/', function(request, response){
      blogManager.getAllBlogs(1,function(error,blogs){

        if(error){
          const model ={
            errorsMessages:[error]
          }
          response.render('accounts-entry.hbs',getForumLayoutModel(model))
        }else{
          const model = {
            errorsMessages:[],
            blogs
          }
          response.render('blogs.hbs',getForumLayoutModel(model))

        }
      })

    })

    router.get('/cat/:id', function(request, response){
      const typeId = request.params.id
      blogManager.getAllBlogsByType(1,typeId,function(error,blogs){

        if(error){
          const model ={
            errorsMessages:[error]
          }
          response.render('accounts-entry.hbs',getForumLayoutModel(model))
        }else{
          const model = {
            errorsMessages:[],
            blogs
          }
          response.render('blogs.hbs',getForumLayoutModel(model))

        }
      })

    })

    router.post('/reply', function(request, response){
      const accountId = request.session.accountId
      const rebly = {
        accountId:request.body.accountId,
        answerId:request.body.answerId,
        reply:request.body.reply
      }
      blogManager.createRebly(accountId,rebly,function(error){
        if(error){
          response.status(400).json([error])
        }else{
          response.setHeader("Location", "/answer/replays/"+rebly.answerId)
          response.status(201).json(rebly)
        }
      })  

    })

    router.post('/repnnly', function(request, response){
      const accountId = request.session.accountId
      blogManager.createBlog(1,request.body,function(error){
        if(error){
        }else{
          response.redirect("/blogs")

        }
      })
    })

    router.post('/comment', function(request, response){
      const blogId = request.body.blogId
      blogManager.createComment(1,request.body,function(error){
        if(error){
console.log(error)

        }else{
          response.redirect("/blogs/"+blogId)
        }
      })
    })

    router.post('/j', function(request, response){
      const accountId = request.session.accountId
      const blogId = request.body.blogId
      blogManager.createRebly(1,request.body,function(error){
        if(error){
console.log(error)
        }else{
          response.redirect("/blogs/"+blogId)

        }
      })
    })

    router.get('/:id', function(request, response){
      const id = request.params.id
      blogManager.getBlog(id,function(error,blog){
        if(error){
          const model ={
            errorsMessages:[error]
          }
          response.render('blog-view.hbs',getForumLayoutModel(model))

        }else{
          const model = {
            errorsMessages:[],
            accountId: request.session.accountId,
            blog
          }
          response.render('blog-view.hbs',getForumLayoutModel(model))

        }
      })

    })



    return router
    
}