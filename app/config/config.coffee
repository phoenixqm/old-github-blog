window.Config =
  name: "app"
  uri:
    base: "/"
    host: "/"
    # api: "http://localhost:1337/"
    api: "https://api.github.com/repos/martin-liu/martin-liu.github.io/"


  default:
    displayCount: 20

  piwik:
    enabled: false
    app: 'appName'
    prod: 'prodName'
    url: ''
    siteId: 0

  intro:
    enabled: true

  # pingfederate SSO
  PFSSO:
    enabled: false

  urlHtml5Mode: true
  version: "0.0.1"
