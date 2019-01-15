# User Login (POST)

 
## **Method** : `POST`
**Description** : Allow user to obtain JWT token by loggin  

**URL** : `/api/auth/`

**Auth Required** : No

**Data constraints**

```json
{
    "username": "[String, 5-50 chars, required]", 
    "password": "[String, 5-1024 chars, required]"
}
```

**Data body**

```json
{   
    "username": "coolKid",  
    "password": "abcd1234"
}
```

## Success Response

**Status** : `200 OK`  
**Data Returned** : JWT token
```json
{
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzMyNzkzMDY4ZGNlMzAzMjIwMGE1OWUiLCJpYXQiOjE1NDc0NDYxMDd9.5UeWY1p-OYpR8KhkROIJUTDEK_nnnAALW5WFD-7JMQs"
}
```

**Authorization** : set the token in the header for routes that require Auth


## Error Response

**Condition** : 
 - If 'username' and 'password' is not valid.   
 - If 'username' and 'password' combination is not matched

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
   "Error message relative to the error"
}
```
