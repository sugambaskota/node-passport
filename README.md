# node-passport

Enable google+ api, get clientID and clientSecret form console.developers.google.com,
get clientID and clientSecret from developers.facebook.com,
get MongoDB Atlas connection url

and then inside config folder create keys.js and then paste following:

```
module.exports = {
    google: {
        clientID: 'client_id_here',
        clientSecret: 'client_secret_here'
    },
    facebook: {
        clientID: 'client_id_here',
        clientSecret: 'client_secret_here'
    },
    mongodb: {
        dbURI: 'mongo_db_atlas_connection_string_here'
    },
    session: {
        cookieKey: 'secret_for_your_cookie'
    }
}
```