# cart-service
This is Service which enables User's to add Ideas and store them in cart. To Checkout & but that Idea. This is just a phase before paying/buying for an Idea. 
A User can add an available Ideas to the cart and proceed to Checkout.

# Installation
Clone this repository into your local 

```bash

Go to that directory
```bash
cd <directory-name>
```
Install all Dependencies for Node to run . You need to have Node , npm already installed in your computer to run this command

```bash
npm install
```
# Run Service

To Run this service your system or Local should have NodeJS Installed.
This starts the service on http://localhost:7000 on your computer 
```bash
npm start
```
or you can Start this service by command :

```bash
node api/index
```

# Usage
This Service has API endpoints at 
```bash
/api/cart --> PUT Request

/api/uncart --> PUT Request

/api/cart/:id --> GET Request

/api/clearcart/:id --> GET Request
```
### For /api/fav - POST Request
Data sending to Request in body should be like 
```JSON
{ 
"user":
     {
     "_id":"5d6ede6a0ba62570afcedd3b"
     },
"cart":
     {
     "_id":"5d6ede6a0ba62570afcedd32",
     "idea_owner": "String",
     "idea_owner_name": "String2",
     "idea_genre": "String3",
     "idea_headline": "String idea_name",
     "idea_description": "String idea_description",
     "price": 50
     } 
}
```
Here the _id in user is the MongoDB UID / _id unique for every user. 

This should be 12 characters and unique and according to the rules of MongoDB _id. Here the _id in cart is the MongoDB UID / _id unique for every Idea.

This should be 12 characters and unique and according to the rules of MongoDB _id. 

The values of the user and the idea are only stored when a particular user makes a request to add an item to his cart. If a user doesn’t click on add to cart / doesn’t interact with cart service in any manner until  , then there will not be that user info in the Database of Cari Service. In the same way if any user didn’t add an idea into cart anytime then that idea info is not stored in the database of cart service.


#### Response :
```JSON
{
    "cart": [
        "5d6ede6a0ba62570afcedd32"
    ],
    "_id": "5d6ede6a0ba62570afcedd3b",
    "__v": 0
}
```

### For /api/uncart - PUT Request
PUT data in Body of Request should be like 
```JSON
{ 
"user":
     {
     "_id":"5d6ede6a0ba62570afcedd3b"
     },
"cart":
     {
     "_id":"5d6ede6a0ba62570afcedd32"
     } 
}
```
Here the _id in user is the MongoDB UID / _id unique for every user. 

This should be 12 characters and unique and according to the rules of MongoDB _id. Here the _id in cart is the MongoDB UID / _id unique for every Idea.
This should be 12 characters and unique and according to the rules of MongoDB _id. 

For making this PUT un-cart Request ( un-cart an Idea ) :

The user needs to send User details in "user" and only Idea _id in "cart"
#### Response :
```JSON
{
    "cart": [],
    "_id": "5d6ede6a0ba62570afcedd3b",
    "__v": 0
}
```
### To Get all cart ideas of a User :
/api/cart/:id -> GET Request

```
http:localhost:7000/api/cart/5d6ede6a0ba62570afcedd3b
```
 here Params :id is the User's UID/_id from User collection. 
 Here the _id in user is the MongoDB UID / _id unique for every user. This shoud 12 characters and uinque and accoridng to the rules of MongoDB _id.
 
 #### Response :
 ```JSON
 [
    {
        "_id": "5d6ede6a0ba62570afcedd38",
        "idea_owner": "String",
        "idea_owner_name": "String2",
        "idea_genre": "String3",
        "idea_headline": "String idea_name",
        "idea_description": "String idea_description",
        "price": 50
    },
    {
        "_id": "5d6ede6a0ba62570afcedd39",
        "idea_owner": "String",
        "idea_owner_name": "String2",
        "idea_genre": "String3",
        "idea_headline": "String idea_name",
        "idea_description": "String idea_description",
        "price": 50
    }
]
```
 ### To Clear Cart of a User:
 /api/clearcart/:id -> GET Request
 
 ```
http:localhost:7000/api/clearcart/5d6ede6a0ba62570afcedd3b
```
 
 here Params :id is the User's UID/_id from User collection. 
 
 Here the _id in user is the MongoDB UID / _id unique for every user. This should be 12 characters and unique and according to the rules of MongoDB _id.
 
 This end point is used to clear all the available ideas present in the cart of a particular user. Here the :id which is _id of the user is used to identify the user and clear all his ideas in his cart.
 
 #### Response :
```JSON
{
    "cart": [],
    "_id": "5d6ede6a0ba62570afcedd3b",
    "__v": 0
}
```
