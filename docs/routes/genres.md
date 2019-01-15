# Customers (POST, GET, PUT, DELETE)


## **Method** : `POST`
**Description** : Create a Genre

**URL** : `/api/genres/`

**Auth Required** : Yes

**Data constraints**

```json
{
    "name": "[String, 5-50 chars, required]"
}
```

**Data body**

```json
{
	"name": "Action"
}
```

## Success Response

**Status** : `200 OK`  
**Data Returned** : The Genre that just created
```json
{
    "_id": "5c3d3e476d77ee697aa6463d",
    "name": "Action"
}
```

## Error Response

**Condition** : 
 - If 'name' is not valid

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
   "Error message relative to the error"
}
```
 ----
## **Method** : `GET`
**Description** : Get a list of all genres 

**URL** : `/api/genres/`

**Auth Required** : No

## Success Response

**Status** : `200 OK`  
**Data Returned** : List of Genres
```json
[
    {
        "_id": "5c3d3e376d77ee697aa6463c",
        "name": "Action",
    },
    {
        "_id": "5c3d3e476d77ee697aa6463d",
        "name": "Sci-fi",
    }
]
```
----
 ## **Method** : `GET /:id`
**Description** : Get single genre based on their id  

**URL** : `/api/genres/:id`

**Auth Required** : No

## Success Response

**Status** : `200 OK`  
**Data Returned** : Single Genre
```json
{
    "_id": "5c3d3e476d77ee697aa6463d",
    "name": "Action"
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
**Description** : Update a single genre based on their id   

**URL** : `/api/genres/:id`

**Auth Required** : Yes

**Data constraints**

```json
{
    "name": "[String, 5-50 chars, required]"
}
```

**Data body**

```json
{
	"name": "New_Genre",
}
```

## Success Response

**Status** : `200 OK`  
**Data Returned** : The updated customer info
```json
{
    "_id": "5c3d3e476d77ee697aa6463d",
    "name": "New_Genre"
}
```

## Error Response

**Condition** : 
 - If 'name' is not valid.
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
**Description** : Delete a single genre based on their id   

**URL** : `/api/genres/:id`

**Auth Required** : Yes

**Admin Required** : Yes

## Success Response

**Status** : `200 OK`  
**Data Returned** : The deleted genre info
```json
{
    "_id": "5c3d3e476d77ee697aa6463d",
    "name": "Action",
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
