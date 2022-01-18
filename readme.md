<!-- About Project -->
<!-- ABOUT THE PROJECT -->
## Personal Expense Recorder
![press-to-start](https://user-images.githubusercontent.com/86989396/142721784-3a52300f-ef64-4b70-8fdf-6817ae1759bf.jpg)

## Introduction
The Pesonal Expense Recorder App helps to record and categorize expenses. With it's user-friendly interface users can easily 
add a new expense, find, edit and delete existing expense from the list. And also this app has filter which categorize expenses by date.

## TECHNOLOGY USED

* HTML
* CSS
* JavaScript
* JQuery
* Bootstrap
* Node.js
* Express
* MongoDB
* Mongoose

## APPROACH

First of all I started from setting up an express to make all CRUD worked. Once I had all CRUD routes set up I jumped into Bootstap and ejs and started designing an app


## UNSOLVED PROBLEMS/STRETCH GOALS

* For some reason after rendering the date shows one day behind in the browser. Only to converting to ISO format, it shows correct date.

## INSTALLATION INSTRUCTIONS

* clone the repository into a local file
* 
* open the index.html file and enjoy

### MVP
As a user, I want to see all my expenses on one list
As a user, I want to be able to add, edit and delete an item in the list
As a user, I want to see my total expense, income and balance seperately on home page


## Instructions
![press-to-start](https://user-images.githubusercontent.com/86989396/142721784-3a52300f-ef64-4b70-8fdf-6817ae1759bf.jpg)

#### Simon will give the first signal. Repeat the signal by clicking the same color lens.               
![game-started](https://user-images.githubusercontent.com/86989396/142721819-9192e825-32c3-4617-9da0-90292efef34c.jpg)

#### Simon will dublicate color as you advance to next level. Repeat the colors. Continue playing as long as you can repeat each sequence of signals correctly.
![image](https://user-images.githubusercontent.com/86989396/142723718-bdd8b461-a597-4016-bead-a02d07192f1e.png)

#### If you fail to repeat a sequence exactly, Simon responds with a 'BAZZ' sound. This means you've lost. Game Over!
![game-over](https://user-images.githubusercontent.com/86989396/142721824-c1ac8e78-3100-4ba5-80bb-732f2f5a17a9.jpg)

<!--------------------------------- Project Proposal ----------------------------------------------->

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