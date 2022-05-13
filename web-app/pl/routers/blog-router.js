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
        errorsTranslator

    }){
     
    const router = express.Router()
    const getPargraphs=function(blog){
      const paragraphs =[]
      for(let i = 1; i < blog.paragraph.length; i++){
        paragraphs.push({
          paragraph: blog.paragraph[i],
          link: blog.link[i],
          linkTitle: blog.linkTitle[i]

        })
      }
      return paragraphs
    } 
    router.get('/', function(request, response){
      const accountType = sessionHandler.getSessionAuthentication(request.session) 

      blogManager.getAllBlogs(accountType,function(error,blogs){

        if(error){
          const model ={
            errorsMessages: errorsTranslator.getErrorsFromTranslater([error])
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
      const accountType = sessionHandler.getSessionAuthentication(request.session) 

      blogManager.getAllBlogsByType(accountType,typeId,function(error,blogs){

        if(error){
          const model ={
            errorsMessages: errorsTranslator.getErrorsFromTranslater([error])
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

      const model = {
        accountId: request.session.accountId,
        paragraphs:[]
      }

      response.render('blog-create-view.hbs',model)

    })

    router.post('/create', function(request, response){
      const accountId = request.session.accountId

      blogManager.createBlog(accountId,request.body,function(errors){

        if(errors.length){

          const model ={
            errorsMessages: errorsTranslator.getErrorsFromTranslater(errors),
            title: request.body.title,
            paragraphs: getPargraphs(request.body),
            type: request.body.type,

            accountId: request.body.accountId
          }
          response.render('blog-create-view.hbs',model)

        }else{
          response.redirect("/blogs")

        }
      })
    })

    router.post('/comment', function(request, response){
      const blogId = request.body.blogId
      const accountId = request.session.accountId

      blogManager.createComment(accountId,request.body,function(Cerror){

        if(Cerror){
          const comment = request.body.comment
          blogManager.getBlog(blogId,accountId,function(error,blog){

            if(error){
              const model ={
                errorsMessages: errorsTranslator.getErrorsFromTranslater([error])
              }
              response.render('blog-view.hbs',getForumLayoutModel(model))
    
            }else{
              const model = {
                errorsMessages: errorsTranslator.getErrorsFromTranslater([Cerror]),
                accountId,
                blog,
                comment

              }
              response.render('blog-view.hbs',getForumLayoutModel(model))
            }
          })

        }else{
          response.redirect("/blogs/"+blogId)
        }
      })
    })


    router.get('/:id', function(request, response){
      const id = request.params.id
      const accountId = request.session.accountId
      blogManager.getBlog(id,accountId,function(error,blog){
        if(error){
          const model ={
            errorsMessages: errorsTranslator.getErrorsFromTranslater([error])
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