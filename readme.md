# AGREGATOR

## TODO

### DB models

```
    Requests {
        id string
        tmdb_id number
        user_id string
        created_at string
    }

    User {
        id string
        email string
        created_At string
        username string
    }
```

### API config

    cors
    controllers + services

### API routes:

```
/movies
    GET /
    GET /:id
    GET /search
    GET /search-with-tmdb

/ratings
    GET /:movieId

/requests
    POST /

/auth
    POST /signin
    POST /signup
    GET /me
```
