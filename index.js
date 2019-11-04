const request = require('request')
const https = require('https')
const express = require('express')
const app = express();
const ClientOAuth2 = require('client-oauth2')
const PORT = process.env.PORT || 5000
const towerAuth = new ClientOAuth2({
  clientId: '1716e71657109259bfd05a3af31598c40e82309d57c3ecd38a18f4b5fadddaf5',
  clientSecret: '0438d178dd4f9467cadb35446b7bf123192fdfae5b75a43d0254325aeba2c21c',
  accessTokenUri: 'https://tower.im/oauth/token',
  authorizationUri: 'https://tower.im/oauth/authorize',
  redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
})
const token = '05d9c7d1425f8d5c451b41b41c49a9b5df4ecb3f72426948343d6b394097aa8d'
app.get('/', (req, res) => {
  res.redirect(towerAuth.code.getUri())
})

app.get('/auth/tower/callback', (req, res) => {
  towerAuth.code.getToken('urn:ietf:wg:oauth:2.0:oob')
    .then(data => {
      console.log(data)
    }).catch(err => {
      console.log('err:', err)
    })
})

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`))