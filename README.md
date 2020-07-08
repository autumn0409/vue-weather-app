[![Build Status](https://travis-ci.org/autumn0409/vue-weather-app.svg?branch=master)](https://travis-ci.org/autumn0409/vue-weather-app)

## Overview

The Vue Weather App is the application created for the software testing final project.

The Vue Weather App allows the user to search for the current weather for a city.  

## Installation Instructions

### Setting Up a Vue Project using the Vue CLI

The Vue CLI is the recommended tool for developing Vue applications.  The goal of the Vue CLI is to allow you to easily create a Vue project and start developing right away.

#### Installing the Vue CLI

The Vue CLI requires the following tools be installed first (pre-requisites):

* Node (JavaScript runtime)
* npm (Node Package Manager)

The Vue CLI is a package that you install using `npm`.  Instead of creating a whole new toolchain for the Vue CLI, the creators of the tool are taking advantage of an existing ecosystem (npm) to develop the set of tools to help develop Vue applications.

The first step in this installation process is downloading Node and npm (Node Package Manager); they are conveniently installed together.

After the installation is complete, you can check that Node is installed by going to your command line (i.e., terminal) and checking the version of Node and npm that are installed:

```sh
$ node -v
v10.16.0

$ npm -v
6.10.1
```

```sh
npm install -g @vue/cli
```

After the installation is complete, you can check that you have access to the `vue` command:

```sh
$ vue --version
3.9.2
```

#### Working with the Vue Weather App

We will need to create a free account at [Open Weather](https://openweathermap.org) and get an API key for using their API service.  The API key can be found in your account page under the 'API Keys' tab.  The API key needs to be included in the `App` component (defined in /src/App.vue) in the data section:

```javascript
// API key from openweathermap.org - Unique to each person
openweathermapApiKey: ''
```

## Running the Application

### Compiles and hot-reloads for development

```
npm run serve
```

### Run your unit tests

```
npm run test:unit
```

## Additional Resources

VueJS Documentation: <https://vuejs.org/v2/guide/>
