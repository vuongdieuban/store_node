# Register Users (POST, GET)

 
## **Method** : `POST`
**Description** : Create and register a user   

**URL** : `/api/users/`

**Auth Required** : No

**Data constraints**

```json
{
    "username": "[String, 5-50 chars, required]", 
    "email": "[String, 5-255 chars, required]",
    "password": "[String, 5-1024 chars, required]",
    "isAdmin" : "[Boolean, not required]"
}
```

**Data body**

```json
{   
    "username": "coolKid",  
    "email": "coolKid@DopeAF.com",
    "password": "abcd1234",
    "isAdmin" : false
}
```

## Success Response

**Status** : `200 OK`  
**Data Returned** : 
```json
{
    "_id": "5c3279df68dce3032200a59f",
    "username": "coolKid",  
    "email": "coolKid@DopeAF.com",
}
```
**Header** : auto-set JWT authorization token in the header after user created :
```json
{
   "x-auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzMyNzkzMDY4ZGNlMzAzMjIwMGE1OWUiLCJpYXQiOjE1NDc0NDYxMDd9.5UeWY1p-OYpR8KhkROIJUTDEK_nnnAALW5WFD-7JMQs"
}
```


## Error Response

**Condition** : 
 - If 'username', 'email' and 'password' is not valid.   
 - If email already exist (indicating user already exist) 

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
   "Error message relative to the error"
}
```
 ----
 ---
## **Method** : `GET`
**Description** : Obtain single user info based on JWT token 

**URL** : `/api/users/me`

**Auth Required** : Yes

**Data constraints** : Set valid JWT token in the header
```json
{
   "x-auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzMyNzkzMDY4ZGNlMzAzMjIwMGE1OWUiLCJpYXQiOjE1NDc0NDYxMDd9.5UeWY1p-OYpR8KhkROIJUTDEK_nnnAALW5WFD-7JMQs"
}
```
**To Acquire Token**:  [Login](auth.md)  `/api/auth/`

## Success Response

**Status** : `200 OK`  
**Data Returned** : 
```json
{
    "_id": "5c3279df68dce3032200a59f",
    "username": "coolKid",  
    "email": "coolKid@DopeAF.com",
    "isAdmin" : false
}
```