# Movies (POST, GET, PUT, DELETE)


## **Method** : `POST`
**Description** : Create a Movie

**URL** : `/api/movies/`

**Auth Required** : Yes

**Data constraints**

```json
{
    "name": "[String, 5-200 chars, required]",
    "genreId": "[String, valid objectId, required]",
    "numberInStock": "[Number, min 0, max 255, required]",
    "dailyRentalRate": "[Number, min 0, max 255, required]",

}
```

**Data body**

```json
{
  "name": "IronMan",
  "genreId" : "5c3bee036d77ee697aa6463b",
  "numberInStock": 10,
  "dailyRentalRate": 2
}
```

## Success Response

**Status** : `200 OK`  
**Data Returned** : The Movie that just created
```json
{
    "_id": "5c3d81f26d77ee697aa6463e",
    "name": "Iron Man",
    "genre": {
        "_id": "5c3bee036d77ee697aa6463b",
        "name": "Action"
    },
    "numberInStock": 10,
    "dailyRentalRate": 2,
}
```

## Error Response

**Condition** : 
 - If "name", "genreId", "numberInStock", "dailyRentalRate" is not valid

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
   "Error message relative to the error"
}
```
 ----
## **Method** : `GET`
**Description** : Get a list of all Movies

**URL** : `/api/movies/`

**Auth Required** : No

## Success Response

**Status** : `200 OK`  
**Data Returned** : List of Movies
```json
[
    {
    "_id": "5c3d81f26d77ee697aa6463e",
    "name": "Iron Man",
    "genre": {
        "_id": "5c3bee036d77ee697aa6463b",
        "name": "Action"
    },
    "numberInStock": 10,
    "dailyRentalRate": 2,
  },
  {
    "_id": "5c3d81f26d77ee697aa6463f",
    "name": "Super Man",
    "genre": {
        "_id": "5c3bee036d77ee697aa6463b",
        "name": "Action"
    },
    "numberInStock": 10,
    "dailyRentalRate": 2,
  }
]
```
----
 ## **Method** : `GET /:id`
**Description** : Get single movie based on their id  

**URL** : `/api/movies/:id`

**Auth Required** : No

## Success Response

**Status** : `200 OK`  
**Data Returned** : Single Movie
```json
{
    "_id": "5c3d81f26d77ee697aa6463e",
    "name": "Iron Man",
    "genre": {
        "_id": "5c3bee036d77ee697aa6463b",
        "name": "Action"
    },
    "numberInStock": 10,
    "dailyRentalRate": 2,
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
**Description** : Update a single movie based on their id   

**URL** : `/api/movies/:id`

**Auth Required** : Yes

**Data body**

```json
{
  "_id": "5c3d81f26d77ee697aa6463e",
  "name": "New_IronMan",
  "genreId" : "5c3d3e476d77ee697aa64646",
  "numberInStock": 6,
  "dailyRentalRate": 1
}
```

## Success Response

**Status** : `200 OK`  
**Data Returned** : The updated customer info
```json
{
  "_id": "5c3d81f26d77ee697aa6463e",
  "name": "New_IronMan",
  "genre": {
      "_id": "5c3d3e476d77ee697aa64646",
      "name": "Sci-fi"
  },
  "numberInStock": 6,
  "dailyRentalRate": 1
}
```

## Error Response

**Condition** : 
 - If 'name', "genreId", "numberInStock", "dailyRentalRate" is not valid.
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
**Description** : Delete a single movie based on their id   

**URL** : `/api/movies/:id`

**Auth Required** : Yes

**Admin Required** : Yes

## Success Response

**Status** : `200 OK`  
**Data Returned** : The deleted genre info
```json
{
  "_id": "5c3d81f26d77ee697aa6463e",
  "name": "Iron Man",
  "genre": {
      "_id": "5c3bee036d77ee697aa6463b",
      "name": "Action"
  },
  "numberInStock": 10,
  "dailyRentalRate": 2,
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
