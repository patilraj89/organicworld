# OrganicWorld

## Problem Statement

Organic World have started business in 2013 as a organic food store. It started in a 100 sqft store at Detroit. Because of high quality products, resonable price and steady supply the store became popular, currently operates with twenty stores in Detroit and planning to open multiple stores across the country.

Organic World wants to digitize their operation. The objective of Organic world is to create a brand of itself and increase their customer volume.

## Proposed Solution

In order to increase their product consumers Organic world needs a solution that will help to reach out to users over the Web for buying their products.

## HIGH LEVEL REQUIREMENTS

- All webpages should have NavigationBar to move through the website easily. The navigation bar should consisit of a logo of the brand, search input and three buttons ‘Home’, ‘Login’, ‘Products’ and ‘Cart’ where Products Button is a dropdown with different categories of products and login is a modal with.

- All webpages also consist a footer which consist links to all webpages to access quickly and social media icons to connect through social medias.

- The landing page should consist of A carousel of products and a multi column layout below which consist of info about the company and partners. Create a Home component 

- The Product page should display the account dropdown button with logout, list of products in a card grid format of tree cards per row. Every card should consist of Quantity, ‘Add to cart’ buttons.

- The Account page should consist of information about the user which can be updated by user.

- The cart page should consist of list of products added and their quantities and price in a table format and features like delete a product, update a product quantity,also a checkout button.
   1. Card page should be designed using angular component. 
   2. Card page should only be accessible to authenticated users
## The roles in this application are

- Customer: View differents products available in store and buy directly through online transaction

## TECH STACK

- Angular8
- Bootstrap
- Jasmine
- Protractor

## PREREQUISITES

  1. Install dependencies npm install
  2. Run the backend server `node server.js` which shall run on port:8761
  3. Run the frontend `npm run start` which shall run on port:4200  

## API ENDPOINTS
  
  1. For the products('Authorization' header with Bearer token required)
     - GET    - http://localhost:8761/products/all          - get all products
     - GET    - http://localhost:8761/products/{category}   - get products in a category  
     - GET    - http://localhost:8761/products/search/{id}  - get a particular product

  2. For the customers('Authorization' header with Bearer token required)
     - PUT    - http://localhost:8761/customers/:id         - update customer details
     - GET    - http://localhost:8761/customers?email=      - get a customer using email
     - POST   - http://localhost:8761/customers             - add a customer

  3. For Order('Authorization' header with Bearer token required)
     - POST   - http://localhost:8761/orders                - save a new order
     - GET    - http://localhost:8761/orders?customerId=    - get a customer orders

  4. For login
     - POST   - http://localhost:8761/auth/login            - authenticate user and create authentication token

  5. For Register
     - POST   - http://localhost:8761/auth/register         - create new users

## Instructions

1. Your are expecting to write code in the given boilerplate so that you can achieve all  high level requirements
2. All the detailed instructions are given inside the project
3. Understand the comments in the project and write code
4. After writing the code unit test your code by running `npm run test` or `ng test` and end-to-end test by running `npm run e2e` or `ng e2e` provided backend server is running.
5. Given db.json file which acts as backend server with all APIs, please do not make any changes in db.json
