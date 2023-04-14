# Reunion-Backend-Assignment

### Docker Setup

<!-- prettier-ignore -->
```js
Building your image

docker build . -t karan.pawar/reunion-backend-assignment

Run the image

docker run -p 41160:8000 -d karan.pawar/reunion-backend-assignment

Test Docker Server

curl -i localhost:41160
```


### API

```js
  For API that requires authenticated users insert JWT token and user ID in header as follows:
  access_token : <JWT_token>
  user_id : <user_ID>
```
