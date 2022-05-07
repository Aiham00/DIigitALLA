const express = require('express')
const session = require('express-session')

const getForumLayoutModel = function(model){
model["layout"]='main.hbs'
return model

}
module.exports = function(
    {
        sessionHandler,
        blogManager

    }){
     
    const router = express.Router()

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

    router.get('/create', function(request, response){
      const accountId = 1

      response.render('blog-create-view.hbs',getForumLayoutModel({accountId}))

    })

    router.post('/create', function(request, response){
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

    router.post('/rebly', function(request, response){
      const accountId = request.session.accountId
      const blogId = request.body.blogId
      blogManager.createReply(1,request.body,function(error){
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