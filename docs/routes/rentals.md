# Movies (POST, GET)

## **Method** : `POST`

**Description** : Create a Rental

**URL** : `/api/rentals/`

**Auth Required** : Yes

**Data constraints**

```json
{
  "customerId": "[String, valid objectId, required]",
  "movieId": "[String, valid objectId, required]"
}
```

**Data body**

```json
{
  "customerId": "5c3d3e476d77ee697aa6463d",
  "movieId": "5c3d81f26d77ee697aa6463e"
}
```

## Success Response

**Status** : `200 OK`  
**Data Returned** : The Rental that just created

```json
{
  "_id": "5c3d83e76d77ee697aa64642",
  "customer": {
    "isGold": false,
    "_id": "5c3d3e476d77ee697aa6463d",
    "name": "JohnSwag",
    "phone": "1234567"
  },
  "movie": {
    "_id": "5c3d81f26d77ee697aa6463e",
    "name": "Iron Man",
    "dailyRentalRate": 2
  },
  "dateRented": "2019-01-15T06:55:35.568Z"
}
```

## Error Response

**Condition** :

- If "customerId" and "movieId" are not valid or not found

**Code** : `400 BAD REQUEST`, `404 NOT FOUND`

**Content** :

```json
{
   "Error message relative to the error"
}
```

---

## **Method** : `GET`

**Description** : Get a list of all Rentals

**URL** : `/api/rentals/`

**Auth Required** : No

## Success Response

**Status** : `200 OK`  
**Data Returned** : List of Rentals

```json
[
  {
    "_id": "5c3e4c65368f29027c4ee3d1",
    "customer": {
      "isGold": false,
      "_id": "5c3e4aa2368f29027c4ee3cd",
      "name": "JohnSwag",
      "phone": "1234567"
    },
    "movie": {
      "_id": "5c3e4bdc368f29027c4ee3ce",
      "name": "Iron Man",
      "dailyRentalRate": 2
    },
    "dateRented": "2019-01-15T21:11:01.465Z"
  },
  {
    "_id": "5c3e4d90368f29027c4ee3e0",
    "customer": {
      "isGold": false,
      "_id": "5c3e4aa2368f29027c4ee3cd",
      "name": "JohnSwag",
      "phone": "1234567"
    },
    "movie": {
      "_id": "5c3e4d74368f29027c4ee3dd",
      "name": "Super Man",
      "dailyRentalRate": 2
    },
    "dateRented": "2019-01-15T21:16:00.021Z"
  }
]
```
