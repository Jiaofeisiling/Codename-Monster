# [Headless CMS with ExpressJS API PRO]((https://headless-cms-with-laravel-json-api.creative-tim.com/?ref=hcejap-readme))

![version](https://img.shields.io/badge/version-1.0.0-blue.svg) [![GitHub issues open](https://img.shields.io/github/issues/creativetimofficial/ct-headless-cms-with-laravel-json-api.svg?maxAge=2592000)](https://github.com/creativetimofficial/ct-headless-cms-with-laravel-json-api/issues?q=is%3Aopen+is%3Aissue) [![GitHub issues closed](https://img.shields.io/github/issues-closed-raw/creativetimofficial/ct-headless-cms-with-laravel-json-api/ct-headless-cms-with-laravel-json-api.svg?maxAge=2592000)](https://github.com/creativetimofficial/ct-headless-cms-with-laravel-json-api/issues?q=is%3Aissue+is%3Aclosed)

![Product Image](https://s3.amazonaws.com/creativetim_bucket/products/690/original/headlesscms-expressjs-pro.jpg?1664798078)

Headless CMS with ExpressJS API PRO is a backend built with the most popular Node.js framework.

# Download
Download the .zip file from the Creative Tim site and extract it. what is the link?

# Node API Setup

## Introduction

Express is a minimal and flexible framework Node.js web application. Express offers core features for creating an API:
- allows setting up a middleware for responding to HTTP requests
- helps with routing for different HTTP methods
- dynamically rendering HTML pages

[Click here to go to the Express docs](https://expressjs.com/)

For the data management was used MongoDB, a non-relational database that provides support for JSON-like storage.

[Click here to go to the MongoDB docs](https://www.mongodb.com/docs/)

## Prerequisites

For your local development you need to have `Node.js` and `npm` version 16 or above installed and a registered MongoDB collection:
- For Windows: https://phoenixnap.com/kb/install-node-js-npm-on-windows
- For Linux: https://www.geeksforgeeks.org/installation-of-node-js-on-linux/
- For Mac: https://treehouse.github.io/installation-guides/mac/node-mac.html

## Project Installation

To install the project you need to have version 16 of Node.js and npm version 8. The first step is to run `npm install` command. Next you need to copy the `.env.example` file and name it `.env`. There are the variables for the database and the URLs:
- DB_LINK="mongodb-link-to-connect"

- JWT_SECRET="token"

- APP_URL_CLIENT= with the default value of http://localhost:3000
- APP_URL_API= with the default value of http://localhost:8080

- add your mailtrap credentials in the MAILTRAP_USER and MAILTRAP_PASSWORD

## Usage

For a token-based authentication `passport` and `passport-jwt` modules were used. Also for managing the database, `mongoose` helped. Two scripts seeding and clearing the collections and documents are found in the `/src/mongoose`. The PRO version has multiple collections for: `users`, `roles`, `permissions` ,`categories`, `tags` and`items`.

To migrate and seed the tables the commands are:
- npm run seed
- npm run clear

To start the API you need to run the command `npm run start:dev`, and now, for example, your React project can use it by adding in your package.json `"proxy": "http://localhost:8080/"`. Check your .env variables to match your URLs.

Three different default users can be used for logging in:
- `admin@jsonapi.com` with the password `secret`
- `creator@jsonapi.com` with the password `secret`
- `member@jsonapi.com` with the password `secret`

The user can have 3 different roles with different permissions. The `permissions` table sets the rights of the user:
- an `admin` has all the rights, it can view, create, edit and delete users, roles, categories, tags and items
- a `creator` has limited rights, it can view, create, edit and delete categories, tags and items
- a `member` can edit its profile

It offers endpoint for login with the default users or it can register a new one. In the case of forgetting the password, the user can request a reset passsword and reset it.

Node API offers endpoints for common CRUD functionalities:
- Authentication API: login, logout, forget passwors and reset password
- Profile API: get profile, update profile
- Users Management: list, create, update, delete and upload profile image
- Roles API: create, update and delete
- Permissions API: list available permissions
- Categories Management API: list, create, update and delete
- Tags Management API: list, create, update and delete
- Items Management API: list, create, update, delete and upload item image

## Table of Contents

* [Versions](#versions)
* [Documentation](#documentation)
* [Dashboards built with Headless CMS with Laravel JSON:API PRO](#dashboards-built-with-headless-cms-with-laravel-json-api-pro)
* [Resources](#resources)
* [Reporting Issues](#reporting-issues)
* [Licensing](#licensing)
* [Useful Links](#useful-links)

## Versions

[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/laravel_logo.png" height="80" />](#)
[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/nodejs-logo.jpg" height="75" />](#)

## Documentation
The documentation for the Node API is hosted at our [here](https://documenter.getpostman.com/view/8138626/Uze1virp).

## Resources
- Download Page: <https://>
- Documentation: <https://documenter.getpostman.com/view/8138626/Uze1virp>
- License Agreement: <https://www.creative-tim.com/license>
- Support: <https://www.creative-tim.com/contact-us>
- Issues: [Github Issues Page](https://)

## Dashboards built with Node API
| Material Dashboard 2 React PRO |
| --- |
| [![Material Dashboard 2 React PRO NodeJS](https://s3.amazonaws.com/creativetim_bucket/products/689/original/react-material-dashboard-pro-nodejs.jpg?1664790326)](https://material-dashboard-pro-react-nodejs.creative-tim.com/dashboards/analytics?ref=readme-hcejap)


## Reporting Issues

We use GitHub Issues as the official bug tracker for the Node API PRO. Here are some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of the Node API PRO. Check the CHANGELOG from your dashboard on our [website](https://www.creative-tim.com/?ref=hcejap-readme).
2. Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed.
3. Some issues may be browser specific, so specifying in what browser you encountered the issue might help.

## Licensing

- Copyright Creative Tim (https://www.creative-tim.com/?ref=hcejap-readme)
- Creative Tim License (https://www.creative-tim.com/license).


## Useful Links

- [Tutorials](https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w)
- [Affiliate Program](https://www.creative-tim.com/affiliates/new) (earn money)
- [Blog Creative Tim](http://blog.creative-tim.com/)
- [Free Products](https://www.creative-tim.com/bootstrap-themes/free) from Creative Tim
- [Premium Products](https://www.creative-tim.com/bootstrap-themes/premium?ref=hcejap-readme) from Creative Tim
- [React Products](https://www.creative-tim.com/bootstrap-themes/react-themes?ref=hcejap-readme) from Creative Tim
- [Angular Products](https://www.creative-tim.com/bootstrap-themes/angular-themes?ref=hcejap-readme) from Creative Tim
- [VueJS Products](https://www.creative-tim.com/bootstrap-themes/vuejs-themes?ref=hcejap-readme) from Creative Tim
- [More products](https://www.creative-tim.com/bootstrap-themes?ref=hcejap-readme) from Creative Tim
- Check our Bundles [here](https://www.creative-tim.com/bundles??ref=hcejap-readme)

## Social Media

### Creative Tim:

Twitter: <https://twitter.com/CreativeTim?ref=hcejap-readme>

Facebook: <https://www.facebook.com/CreativeTim?ref=hcejap-readme>

Dribbble: <https://dribbble.com/creativetim?ref=hcejap-readme>

Instagram: <https://www.instagram.com/CreativeTimOfficial?ref=hcejap-readme>


### Updivision:

Twitter: <https://twitter.com/updivision?ref=hcejap-readme>

Facebook: <https://www.facebook.com/updivision?ref=hcejap-readme>

Linkedin: <https://www.linkedin.com/company/updivision?ref=hcejap-readme>

Updivision Blog: <https://updivision.com/blog/?ref=hcejap-readme>

## Credits

- [Creative Tim](https://creative-tim.com/?ref=hcejap-readme)
- [UPDIVISION](https://updivision.com)
