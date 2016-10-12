'use strict'
App.factory 'SampleRemoteService', (Restangular, BaseRemoteService) ->
  new class SampleRemoteService extends BaseRemoteService
    constructor: ->
      super()
      @rest = Restangular.all('sample')

    query: (param)->
      @doQuery 'test1', param

    queryWithCanceler: (param, canceler)->
      @doQuery 'test2', param, canceler

    queryWithCache: (param)->
      @doQueryWithCache 'test3', param, null, 300

    queryWithCancelerAndCache: (param, canceler)->
      @doQueryWithCache 'test4', param, canceler, 300



App.factory 'BlogRemoteService', (Restangular, BaseRemoteService) ->
  new class BlogRemoteService extends BaseRemoteService
    constructor: ->
      super()
      @rest = Restangular.all('')

    query: (param)->
      @doQuery 'test1', param

    queryBlogList: (param)->
      @doQuery 'issues', param

    renderMarkdown: (summary)->
      # TODO
      console.log summary

    queryWithCanceler: (param, canceler)->
      @doQuery 'test2', param, canceler

    queryWithCache: (param)->
      @doQueryWithCache 'test3', param, null, 300

    queryWithCancelerAndCache: (param, canceler)->
      @doQueryWithCache 'test4', param, canceler, 300