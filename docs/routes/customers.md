# Customers (POST, GET, PUT, DELETE)


## **Method** : `POST`
**Description** : Create a Customer for the store

**URL** : `/api/customers/`

**Auth Required** : Yes

**Data constraints**

```json
{
    "name": "[String, 5-50 chars, required]", 
    "phone": "[String, 5-10 chars, required]",
    "isGold": "[Boolean, default: false]"
}
```

**Data body**

```json
{
	"name": "JohnSwag",
	"phone": "1234567"
}
```

## Success Response

**Status** : `200 OK`  
**Data Returned** : The Customer that just created
```json
{
    "isGold": false,
    "_id": "5c3d3e476d77ee697aa6463d",
    "name": "JohnSwag",
    "phone": "1234567",
}
```

## Error Response

**Condition** : 
 - If 'name' and 'phone' is not valid.   

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
   "Error message relative to the error"
}
```
 ----
## **Method** : `GET`
**Description** : Get a list of all customers 

**URL** : `/api/customers/`

**Auth Required** : No

## Success Response

**Status** : `200 OK`  
**Data Returned** : List of Customers
```json
[
    {
        "isGold": false,
        "_id": "5c3d3e376d77ee697aa6463c",
        "name": "JohnDoe",
        "phone": "1234567",
    },
    {
        "isGold": false,
        "_id": "5c3d3e476d77ee697aa6463d",
        "name": "JohnSwag",
        "phone": "1234567",
    }
]
```
----
 ## **Method** : `GET /:id`
**Description** : Get single customer based on their id  

**URL** : `/api/customers/:id`

**Auth Required** : No

## Success Response

**Status** : `200 OK`  
**Data Returned** : Single Customer
```json
{
    "isGold": false,
    "_id": "5c3d3e476d77ee697aa6463d",
    "name": "JohnSwag",
    "phone": "1234567",
}
```

## Error Response

**Condition** : 
 - If 'id' is not valid or not found 

**Code** : `400 BAD REQUEST` , `404 NOT FOUND`

**Content** :

```json
{
   "Error message relative to the error"
} 
```
----
## **Method** : `PUT /:id`
**Description** : Update a single customer based on their id   

**URL** : `/api/customers/:id`

**Auth Required** : Yes

**Data constraints**

```json
{
    "name": "[String, 5-50 chars, required]", 
    "phone": "[String, 5-10 chars, required]",
    "isGold": "[Boolean, default: false]"
}
```

**Data body**

```json
{
	"name": "JohnCool",
	"phone": "7654321"
}
```

## Success Response

**Status** : `200 OK`  
**Data Returned** : The updated customer info
```json
{
    "isGold": false,
    "_id": "5c3d3e476d77ee697aa6463d",
    "name": "JohnCool",
    "phone": "7654321",
}
```

## Error Response

**Condition** : 
 - If 'name' and 'phone' is not valid.
 - If 'id' is not valid or not found 

**Code** : `400 BAD REQUEST` , `404 NOT FOUND`

**Content** :

```json
{
   "Error message relative to the error"
}
```
 ----
 ## **Method** : `DELETE /:id`
**Description** : Delete a single customer based on their id   

**URL** : `/api/customers/:id`

**Auth Required** : Yes

**Admin Required** : Yes

## Success Response

**Status** : `200 OK`  
**Data Returned** : The deleted customer info
```json
{
    "isGold": false,
    "_id": "5c3d3e476d77ee697aa6463d",
    "name": "JohnCool",
    "phone": "7654321",
}
```

## Error Response

**Condition** : 
 - If 'id' is not valid or not found 

**Code** : `400 BAD REQUEST` , `404 NOT FOUND`

**Content** :

```json
{
   "Error message relative to the error"
}
```
