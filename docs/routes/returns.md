# Movies (POST)

## **Method** : `POST`

**Description** : Create a Return

**URL** : `/api/returns/`

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
**Data Returned** : The Return that just created

```json
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
  "dateRented": "2019-01-15T21:16:00.021Z",
  "dateReturned": "2019-01-15T21:28:27.096Z",
  "rentalFee": 0
}
```

## Error Response

**Condition** :

- If "customerId" and "movieId" are not valid or not found
- If returns already processed (returns existed)

**Code** : `400 BAD REQUEST`, `404 NOT FOUND`

**Content** :

```json
{
   "Error message relative to the error"
}
```
