# E-commerce project

Project Name: **_ProdCom-E_**

GitHub repo: https://github.com/sifytul/ProdCom-E
Notion: https://smoggy-larch-f18.notion.site/E-commerce-project-1d4d31ef332f433c83e317ec21a03c3f?pvs=4

## Requirements:

- User
  - Users can sign up, log in, and log out.
  - Client, admin
- Products

  - Any guest or user can view the product list and specific product
  - Only Admin can add, update, and delete products

- Carts

  - Any user (guest/authenticated) can add any product to the cart
  - Users can view the item list added to the cart.
  - Cart items will be stored in a local storage

- Order
  - Only authenticated users can create an order.

### Time Frame: 30 days

### Start Project: 7/9/23

### Probable End: 15/10/23

## Tech Stack - PNNNT (Postgres, NestJS, NextJS, Node, TypeScipt)

- Backend
  Language: **TypeScript**
  - For type-safe development, TypeScript is suitable for developing bug-free code for production environments.
    Framework: **NestJS**
  - NestJS works in a modular way and it is mainly focused on type-safe development. It could be beneficial in maintaining our code in a future perspective.
    Database: **Postgres**
  - In an e-commerce website, we need to handle a lot of transactions. The data should be structured and schema based. So, we can use table to make data consistent. We need a DB that is industry standard, data consistent, durable, and fault tolerant. We assume that postgres can handle our expectation in this scenario.
    DB ORM: TypeORM or, Prisma
  - based on the robustness and stability, I chose TypeORM v0.3.17
- Frontend
  Framework: **NextJS**
  - As it is an e-commerce app, we need on-page SEO to rank. We need to render the page on the server to achieve this behavior. **NextJS** is currently a popular framework to handle the SSR and SSG. So we chose this.
    State management: **Redux Toolkit**
  - As we have to handle a bunch of states for users, products, carts, orders, payments, and so on, we need to use a robust state management tool. Redux toolkit is an industry-standard tool and it reduces much of the boilerplate code and handles immutable updates automatically over core redux. That’s why we believe, it can remove our headache to manage the state.
    Data fetching tool: **Rtk Query**
  - To improve the user experience, we need to use the caching technique. RTK Query handles this smoothly. So, we picked it for data fetching and caching purposes.

[Project Timeline for E-Commerce Fullstack Project](https://www.notion.so/Project-Timeline-for-E-Commerce-Fullstack-Project-5af509f91da940ad81218b7463f43a12?pvs=21)

# Backend

## Routes

### Auth

- [x] POST - [public] - /auth/register
- Register a user

  Method: POST

  Access: Public

  Path: /auth/register

  Description: This route will create a user with provided payload

  Request body:

  - Name string
  - Email string
  - Password (hashed)

  Response :

  201:

  - success: true
  - accessToken: string
  - 400:
    - message: Bad request
    ```json
    {
      "success": false,
      "errors": [
        {
          "field": "email",
          "message": "duplicate email"
        }
      ]
    }
    ```

- [x] POST - [public] - /auth/login
- Login
  Method: POST
  Access: Public
  Path: /auth/login
  Description: This route will log in a user to the website
  Request body:
  - Email string
  - Password (hashed)
    Response :
  - 200 :
    response will set a refresh token in the cookies and provide response as follows.
    - data:
      - success: true
      - accessToken: string
- [x] GET - [private] - /auth/refresh-token
- Retrieve an access token by providing a refresh token

  Method: Get

  Access: Private

  path: /auth/refresh-token

  description: Retrieve an access token by providing a refresh token

  response:

  - 200:
    - success: true
    - accessToken: string
  - 401:
    - status: "error"
    - message: "Unauthorized"
    - code: 401

- [x] PATCH- [public] - auth/password/forgot
- Forgot password

  Method: POST

  Access: public

  Path: /auth/password/forgot

  Description: This route will help a user to reset his password if he has an account on this website with the provided email.

  Request body:

  - Email string

  Response :

  - 200 :
    response will send an email to the user email address with the resetPassword url and provide a response as follows.
    - message - [Sent an email with reset link if the email is valid. Check your inbox]

- [x] PATCH- [private] - auth/password/reset/:token
- Password reset

  Method: POST

  Access: private

  Path: /password/reset/:token

  param: token

  Description: This route will reset the password of the particular user.

  Request body:

  - Password (hashed)

  Response :

  - 201 :
    response will set a refresh token in the cookies and provide response as follows.
    - data:
      - success: true
      - accessToken: string
  - 400:
    - message

- [x] /logout
- Logout
  Method: POST
  Access: private
  Path: /auth/logout
  Description: This route will logout the user
  Response :
  - 200 :
    response will invalidate the refresh token in the cookies and provide response as follows.
    - data:
      - success: true
      - accessToken: string
  - 400:
    - message
- User

  ### Me Route

  - [x] GET - [private] - /me
  - Fetch the user details

    Method: Get

    Access: Private

    path: /me

    description: This will retrieve the profile data based on the provided token.

    response:

    - 200:
      - data:
        - name
        - email
        - address
          - id
          - address - string
          - city - string
          - state - string
          - country - string
          - pinCode - Int
          - phoneNo - Int
        - avatar
        - order details
    - 401:
      - status: "error"
      - message: "Unauthorized"
      - code: 401

  - [x] PATCH- [private] - /password/update
  - update password

    Method: PATCH

    Access: Private

    path: /password/update

    description: This route will update the password

    Request Body:

    - old Password
    - newPassword

    Response:

    - 204:
      - success: message
    - 400:
      - message: bad request
    - 401:
      - message: unauthorized

  - [x] PATCH- [private] - /me/update
  - Update the user profile
    Method: PATCH
    Access: Private
    path: /me/update
    description: This route will update the name or avatar of the user.
    Request body:
    - name
    - avatar
      Response:
    - 204:
      - success: message
    - 400:
      - message: bad request
    - 401:
      - message: unauthorized

  ### Role-based routes (Admin)

  - [x] GET - [private] - /admin/users?query=params
  - Get all Users

    Method: GET

    Access: private (admin)

    path: /admin/users?query=params

    Query:

    - page (default 1) - current page number
    - limit (default 10) - the number of objects should be returned
    - sortType (default desc) - the type of sort, it could be either asc or desc
    - sortBy (default createdAt) - the property that will used to sort. It could be either createdAt or name.
    - search - the search term to filter users based on the titles.

    response:

    - 200:
      - Data
        - [ user data ]
      - pagination
        - page
        - limit
        - nextPage
        - prevPage
        - totalPage
        - totalArticle
      - links
        - self
        - nextPage
        - prevPage
    - 401:
      - message
    - 403:
      - message

  - [x] GET - [private] - /admin/users/:id
  - Get an individual user by ID

    Method: GET

    Access: private (admin)

    path: /admin/users/:id

    Response:

    - 200:
      - data:
        - name
        - email
        - password
        - avatar
        - role
        - resetPasswordToken
        - resetPasswordExpire
        - timestamp
    - 401:
      - message
    - 403:
      - message
    - 404:
      - message

  - [x] PATCH- [private] - /admin/users/:id
  - Update user role

    Method: PATCH

    Access: private (admin)

    path: /admin/users/:id

    params: id

    description: This route will update the user role

    Request body:

    - role

    Response:

    - 201:
      - message
    - 401:
      - message
    - 403:
      - message
    - 404:
      - message

  - [x] DELETE- [private] - /admin/users/:id
  - Delete a user
    Method: DELETE
    Access: private (admin)
    path: /admin/users/:id
    params: id
    description: This route will delete a user
    Response:
    - 200:
      - message
    - 401:
      - message
    - 403:
      - message
    - 404:
      - message

- Products

  ### Public Routes

  - [ ] GET - [public] - /products
  - Get all products to display

    Method: GET
    Access: public
    path: /products
    description: This route will retrieve all the products
    Response:

    - 200:

    - Data
      - type: array
      - content:
        - id
        - name
        - First product image url
        - price
        - ratings
        - stock
        - links:
          - self: /products/2

  - [ ] GET - [public] - /products/:id
  - Get details of an individual product by ID
    Method: GET
    Access: public
    path: /products/:id
    params: id
    Response:
    - 200:
      - data:
        - id
        - name
        - description
        - variant
        - color
        - size
        - ratings
        - price
        - images URL list
        - category
        - stock
        - reviews
          - type: array
          - content:
            - reviewerId
            - comment
            - ratings
    - 404:
      - message

  ### Admin routes

  - [ ] GET - [private] - /admin/products
  - Get all products

    Method: GET

    Access: private

    path: /products

    description: This route will retrieve all the products

    Response:

    - 200 :
      - Data:
        - type: array
        - content:
          - id
          - name
          - First product image URL
          - price
          - ratings
          - stock
          - category
          - numOfReviews
    - 401:
      - message
    - 403:
      - message
    - 404:
      - message

  - [ ] POST - [private] - /admin/products/new
  - Add a new Product

    Method: POST

    Access: private

    Path: /admin/product/new

    Description: This route will create a product with provided payload

    Request body:

    - Name string
    - description string
    - price float
    - images
    - category
    - stock
    - addedBy

    Response :

    201: message

  - [ ] PATCH - [private] - /admin/products/:id
  - Update product’s info

    Method: PATCH

    Access: private

    path: /admin/product/:id

    param: id (productId)

    description: This route will update a product based on productId

    request body:

    - name
    - description
    - price
    - ratings
    - images
    - category
    - stock

    response:

    - 201:
      - message
    - 401: → If not logged in
      - message
    - 403: → if the updater is not authorized to perform this action
      - message
    - 404:
      - message

  - [ ] DELETE - [private] - /admin/products/:id
  - Delete a product
    Method: DELETE
    Access: private
    path: /admin/product/:id
    param: productID (id)
    description: This route will delete a product based on **\*\*\*\***\*\*\*\***\*\*\*\***productId**\*\*\*\***\*\*\*\***\*\*\*\***
    requset body: none
    response:
    - 200:
      - message
    - 401: → If not logged in
      - message
    - 403: → if the deleter is not authorized to perform this
      - message
    - 404:
      - message

- Reviews

  - [ ] GET - [public] - /products/:id/reviews
  - Get reviews related to individual product
    Method: GET
    Access: public
    path: /products/:id/reviews
    params: id
    Response:
    - 200:
      - data:
        - type: array
        - content
          - id
          - name
          - description
          - variant
          - ratings
          - price
          - images URL list
          - category
          - stock
          - reviews
            - type: array
            - content:
              - reviewerId
              - comment
              - ratings
    - 404:
      - message (if certain product didn’t exist)

  ### Authenticated user routes

  - [ ] POST - [private] - /products/:id/reviews
  - Post a review for a certain product

    Method: POST

    Access: private

    path: /products/:id/review

    param: productID (id)

    description: This route will post a review on a specific product

    Request Body:

    - comment: string
    - rating: default - 5
    - product images: default - null

    - reviewerID: int → will be collected from token
    - productID: int → will be collected from url params

    Response:

    - 201:
      - message: success
    - 401:
      - message: failure
    - -

  - [ ] PATCH - [private] - /reviews/:id
  - Update a review

    Method: PATCH

    Access: private

    path: reviews/:id

    param: id (reviewId)

    description: This route will update a review on a specific product based on **reviewId** and **reviewerId**

    request body:

    - comment
    - images

    response:

    - 201:
      - message
    - 401: → If not logged in
      - message
    - 403: → if the review is not reviewed by logged in user
      - message
    - 404:
      - message

  - [ ] DELETE - [private] - /products/:id/reviews/:reviewId
  - Delete a review
    Method: DELETE
    Access: private
    path: /products/:id/review/:reviewId
    param: productID (id) , reviewId
    description: This route will delete a review on a specific product based on **reviewId** and **reviewerId**
    requset body: none
    response:
    - 200:
      - message
    - 401: → If not logged in
      - message
    - 403: → if the review is not reviewed by logged in user
      - message
    - 404:
      - message

- Orders

  - [ ] GET - [private] - /me/orders
  - Get all the orders of the logged in user

    Method: GET

    Access: private

    path: /me/orders

    description: This route will retrieve all the orders

    Response:

    - 200 :
      - Data:
        - type: array
        - content:
          - id
          - itemsPrice
          - shippingPrice
          - totalPrice
          - paymentInfo
          - (status == ‘delivered’) ? deliveredAt : probableDeliveryDate
          - status
    - 401:
      - message
    - 403:
      - message

  - [ ] GET - [private] - /me/orders/:id
  - Get all an individual order details of the logged in user

    Method: GET

    Access: private

    path: /me/orders/:id

    description: This route will retrieve an individual order details

    Response:

    - 200 :
      - Data:
        - type: array
        - content:
          - id
          - itemsPrice
          - shippingPrice
          - totalPrice
          - paymentInfo
          - (status == ‘delivered’) ? deliveredAt : probableDeliveryDate
          - status
          - orderedItems:
            - type: array
            - content:
              - product
                - name
                - first image url
                - price
              - quantity
              - subtotal
    - 401:
      - message
    - 403:
      - message

  - [ ] POST - [private] - /orders/new
  - This will create an order
    Method: POST
    Access: private
    path: /order/new
    description: This route will create an order.
    Request Body:
    - products (array)
      - product id
      - quantity
        Response:
    - 201:
      - message: success and redirect to payment page with the invoice
        Process:
    1. Create an order in Order Table and get the orderId =⇒
    2. Create multiple ordered Items in orderedItems table with the ordertId retrieved from the prev stage =⇒
    3. Then update the Order table with that specific OrderId(total Price, estimate delivery, paymentInfo etc.)
  - [ ] PATCH - [private] - /me/orders/:id
  - Edit / coupon apply / cancel or confirm the order by providing payment information (cod or paid) within 30 min. After 30 min the order will be deleted automatically.
    Method: PATCH
    Access: private
    path: /me/orders/:id
    description: This route will change the order status to cancel. After that, there will be another chance to reorder the product with a payload (like changing variant, quantity, etc.). After that, there will be no chance to cancel.
    request payload:
    type: edit / coupon / confirmation or cancel
    - discard or increase product quantity
      - product id
      - quantity
        or,
    - coupon apply
      - coupon code
        or,
    - status
      - if confirmed then must provide payment info - payment
        response:
    - 200:
      - success: message
    - 401:
      - success: unauthorized
    - 500
  - [ ] PUT - [private] - /me/orders/:id/reorder
  - Reorder the previously canceled order
    Method: PUT
    Access: private
    path: /me/orders/:id/reorder
    description: This route will reorder a previously canceled order.
    Request Body:
    - products (array)
      - product id
      - quantity
    - paymentInfo
      Response:
    - 201:
      - message: success
    - 402:
      - message: payment required

  ### Admin routes

  - [ ] GET - [private] - /admin/orders
  - Get all orders list

    Method: GET

    Access: private

    path: /admin/orders

    description: This route will retrieve all order details

    Response:

    - 200 :
      - Data:
        - type: array
        - content:
          - id
          - itemsPrice
          - shippingPrice
          - totalPrice
          - paymentInfo
          - (status == ‘delivered’) ? deliveredAt : probableDeliveryDate
          - status
          - orderedItems:
            - type: array
            - content:
              - product
                - name
                - first image url
              - quantity
              - subtotal
    - 401:
      - message
    - 403:
      - message

  - [ ] PUT - [private] -/admin/orders/:id
  - Update an order if exists otherwise create a new one

    Method: PUT

    Access: private

    path: /admin/order/:id

    description: Update an order if exists otherwise create a new one

    Request Body:

    - probableShippingDate (if not delivered yet)
    - status
    - quantity of specific ordered products
    - shippingPrice

    Response:

    - 200 :
      - Data:
        - type: array
        - content:
          - id
          - itemsPrice
          - shippingPrice
          - totalPrice
          - paymentInfo
          - (status == ‘delivered’) ? deliveredAt : probableDeliveryDate
          - status
          - orderedItems:
            - type: array
            - content:
              - product
                - name
                - first image url
              - quantity
              - subtotal
    - 401:
      - message
    - 403:
      - message

  - [ ] DELETE - [private] -/admin/orders/:id
  - Delete an order by id
    Method: DELETE
    Access: private
    path: /admin/order/:id
    description: Delete an order if exists
    Param: orderId (:id)
    Response:
    - 200 :
      - message
    - 401:
      - message
    - 403:
      - message

//Need to implement in future

- Category
- Cart
  - [ ] GET - [private] - /cart
  - [ ] PUT - [private] - /cart
  - [ ] DELETE - [private] - /cart
- Payment
  - [ ] POST - [private] - /payment/process
  - [ ] GET - [private] - /stripeapikey

## Models

- User
  - name - string
  - email - string
  - password - string
  - avatar_public_id
  - avatar_url
  - role: enum - [user, admin] default - user
  - token_version
  - resetPasswordToken: string - default: null ❌
  - resetPasswordExpire: Date ❌
  - timestamp
- Product
  - id
  - name - string
  - description - text
  - price - float
  - ratings: int - default: 0 → need to come back → make average of all reviews
  - category_id: Fk
  - stock: int
  - discount - ( ≥0 and ≤1)
  - added_by: User - Fk
  - timestamp
- Review
  - id - int
  - comment - string
  - rating - int
  - product_id -Fk
  - reviewer_id - Fk
  - timestamp
- Category
  - id
  - category_name
  - description
  - image_public_id
  - image_url
  - timestamp
- Order
  - id
  - order_date
  - probable_delivery_date
  - delivered_at
  - status: enum [pending, confirmed, canceled, processing, shipping, deliverd] default - pending
  - total_items - Int
  - items_price - Float
  - shipping_price - Float
  - total_price
  - comments
  - customer_id -Fk
  - shipping_info_id - Fk
  - payment_info_id : enum [cod, paid]
- Ordered Items
  - id
  - order_id - FK
  - product_id - FK
  - quantity
  - subTotal
- Cart
  - id
  - user_id - Fk
  - timestamp
- CartItems
  - product_id - Fk
  - cart_id - Fk
  - quantity
  - timestamp
- Address
  - id
  - address - string
  - city - string
  - state - string
  - country - string
  - pin_code - Int
  - contact_info - Fk
  - user_id - Fk
- contact_info
  - id
  - phone_one
  - phone_two
  - email
  - user_id - Fk
  - timestamp
- ProductImage
  - id
  - public_id
  - url
  - product_id
  - timestamp
- Payment ️
  - id
  - medium
  - transaction_number
  - amount - default ‘cod’
  - payment_date
  - status - enum [paid, unpaid] - default- unpaid

# ER Diagram

**Version 2.0**
![ER-diagram.drawio.png](./ER-diagramV2.drawio.png)

**Version 1.0**
![ER-diagram.drawio.png](./ER-diagramV1.drawio.png)

## Swagger (OpenAPI specification)
