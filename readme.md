<!-- ABOUT THE PROJECT -->
### Personal Expenses Tracker

This app helps to control and monitor our spending and budget

### MVP
As a user, I want to see all my expenses on one list
As a user, I want to be able to add, edit and delete an item in the list
As a user, I want to see my total expense, income and balance seperately on home page


### Stretch Goals
As a user I want to be able to categorize my expenses into folders. Example folders: Grocery, Transport, Food & Eat, Family, Medicine etc.
As a user I want to be able to categorize for weekly, monthly and yearly
As a user I want to have my bydget list secured with username and password



### Front-end
I am planning to use EJS and Bootstrap

### List of Mongoose models and their properties
expenseSchema = {
date: Date,
category: {type: String, required: true},
description: {type: String, required: true},
amount: {type: Number, required: true}
}


### List of Routes
Show route
Post route
Edit route
Delete route

### User stories

### Wireframes