## To use Passport with the local strategy

```bash
$ npm install passport
$ npm install passport-local
```

## You also need express-session and connect-mongo and the session configuration in app.js from the node-basic-auth

```bash
$ npm install express-session
$ npm install connect-mongo
```

## To use Passport with the GitHub strategy

```bash
$ npm install passport
$ npm install passport-github
```

### Add this config for the GitHub strategy - you have to register a GitHub OAuth app in the settings on your GitHub account

```js
// app.js
// passport - github config
const GithubStrategy = require('passport-github').Strategy;
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      // find or create user
      User.findOne({ githubId: profile.id })
        .then(userFromDB => {
          if (userFromDB !== null) {
            done(null, userFromDB)
          } else {
            User.create({ githubId: profile.id, username: profile._json.login, avatar: profile._json.avatar_url })
              .then(userFromDB => {
                done(null, userFromDB);
              })
          }
        })
        .catch(err => {
          done(err);
        })
    }
  )
)
```

### Add these two routes

```js
// routes/auth.js

// github login
router.get('/github', passport.authenticate('github'));

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
)
```

### And finally a link to the login view

```html
<a href="/github">Log in with GitHub</a>
```