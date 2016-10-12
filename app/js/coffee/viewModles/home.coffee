
App.factory 'HomeViewModel', (BaseViewModel, BlogRemoteService) ->

  class HomeViewModel extends BaseViewModel
    ## Override

    decorateBlog: (blog) =>
      if !blog.body
        return blog
      metaStr = blog.body.substring 0, blog.body.indexOf('-->')
      metaStr = metaStr.replace /\n|\r|<!-{2,}/gm, ' '
      try
        meta = JSON.parse(metaStr)
      catch _error
        e = _error
        console.log e

      blog.meta = meta
      if blog.meta.summary
        BlogRemoteService.renderMarkdown(blog.meta.summary).then (data) =>
          return blog.meta.summary = data

      return blog


    processBlogs: (blogs) =>
      return _.map blogs, @decorateBlog

    bindView : =>
      @data.announcements = [
        {
          date: "2014-01-01"
          msg: "this is a test"
        }
      ]
      params = {
        labels:'blog'
        page:1
        per_page:10
        state:'open'
      }
      # console.log this
      that = this
      BlogRemoteService.queryBlogList(params).then (data)->
        console.log "success with data: ", data
        return that.data.blogs = that.processBlogs data
      , (err)->
        console.log "fail with err: ", err

    ## Override
    bindAction: =>
