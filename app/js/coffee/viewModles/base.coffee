App.factory 'BaseViewModel', ($q, $location, PiwikService
, Config, LoadingService, IntroService) ->

  class BaseViewModel
    constructor : (@scope)->
      @state = {}
      @data = {}
      @actions = @bindAction()

      # Bind viewModel to view after page init
      @pageInit().then @bindView
      if Config.debug == true
        window.scope = @scope

    initialize : =>
      defer = $q.defer()
      defer.resolve()
      defer.promise

    bindView : =>
    bindAction : =>

    logout : ->
      localStorage.clear()
      $location.url('/logout')

    pageInit : =>
      defer = $q.defer()
      @initialize().then =>
        LoadingService.done()
        @scope.init().then =>
          # Intro
          IntroService.init()
          # Piwik
          PiwikService.init @scope.user.nt

          @scope.initializing = 100
          defer.resolve()
      defer.promise
