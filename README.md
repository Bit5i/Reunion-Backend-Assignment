# Reunion-Backend-Assignment

## Docker Setup
 
Building your image
 
```js
docker build . -t karan.pawar/reunion-backend-assignment
```
 
Run the image
 
```js
docker run -p 41160:8000 -d karan.pawar/reunion-backend-assignment
```
 
Test Docker Server
 
```js
curl -i localhost:41160
```



### API

```js
  For API that requires authenticated users insert JWT token and user ID in header as follows:
  access_token : <JWT_token>
  user_id : <user_ID>
```
