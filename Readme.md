<div align="center">
  <br />
    <img src="">
  <br />

  <div>
    <img src="https://img.shields.io/badge/-React_JS-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
  </div>

  <h3 align="center">An E-commerce Store</h3>

   <div align="center">
     A comprehensive e-commerce store featuring comprehensive authentication with live updates for real-time actions across all devices.
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

Nextjs-based e-commerce store featuring comprehensive authentication, order place and tracking charts, with live updates for real-time actions across all devices.

## <a name="tech-stack">⚙️ Tech Stack</a>

### Frontend

- TypeScript
- Next.js 14
- Tailwind css

### Backend

- Nest.js
- PostgreSQL
- TypeORM
- Swagger

## <a name="features">🔋 Features</a>

👉 **Authentication**: Seamless onboarding with secure login and signup functionalities; robust password recovery ensures a smooth authentication experience.

👉 **Authorization**: Granular access control regulates user actions, maintaining data security and user permissions.

👉 **Home Page**: Dynamic home page showcases featured and regular products and categories for key metrics; real-time updates on activities, upcoming events, and a deals.

👉 **Cart Page**:

- Add and remove products from the cart
- Change the quantity of the products
- Checkout the products
- Make orders
- View the order summary
- View the order history

👉 **Profile Page**: Personalized user profile with account details, order history, and saved addresses; seamless management of user information.

👉 **Account Settings**: Personalized user account settings for profile management; streamlined configuration options for a tailored application experience.

👉 **Responsive**: Full responsiveness across devices for consistent user experience; fluid design adapts seamlessly to various screen sizes, ensuring accessibility.

and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [yarn](https://yarnpkg.com/) (Node Package Manager)
- [PostgreSQL](https://www.postgresql.org/)

**Cloning the Repository**

```bash
git clone https://github.com/sifytul/ProdCom-E.git
cd ProdCom-E
```

**Run the app in docker**

```bash
docker-compose -f docker-compose-dev.yml up --build
```

or, run the app in local

**Installation**

### Database

install postgresql based on your operating system and create a database with the name `prodcom-e`

Go to https://www.postgresql.org/download/ to download and install postgresql

```bash
$ psql -U postgres
$ CREATE DATABASE prodcom_e;
\q
```

Install the project dependencies using yarn:

### Backend

```bash
$ cd backend
$ yarn install
```

_open the .env.example file and rename it to .env and fill the required fields_

```bash
REFRESH_TOKEN_SECRET=add_your_refresh_token_secret
REFRESH_TOKEN_NAME=qid
REFRESH_TOKEN_EXPIREDIN=3d

ACCESS_TOKEN_SECRET=add_your_access_token_secret
ACCESS_TOKEN_NAME=jid
ACCESS_TOKEN_EXPIREDIN=15m

FRONTEND_URL=http://localhost:3000


LOCAL_POSTGRES_DB_URI= postgres://postgres:postgres@localhost:5432/prodcom_e

FORGOT_PASSWORD_SECRET=add_forgot_password_secret
FORGOT_PASSWORD_TOKEN_EXPIREDIN=1h
CORS_ORIGIN= http://localhost:3000
ENV= development

# optional
NODEMAILER_USER=add_node_mailer_user
NODEMAILER_PASSWORD=add_node_mailer_password
CLOUDINARY_NAME= add_cloudinary_name
CLOUDINARY_API_KEY= add_cloudinary_api_key
CLOUDINARY_API_SECRET= add_cloudinary_api_secret
```

**Running the Project**

```bash
$ yarn start:dev
```

### open another terminal

### Frontend

```bash
$ cd frontend
$ yarn install
```

**Running the Project**

```bash
$ yarn dev
```

**Finally display the project in the browser**

Open [http://localhost:4000/api/v1](http://localhost:4000/api/v1) in your browser to view the api endpoints.

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
