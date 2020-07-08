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

```sh
$ node -v
v10.16.0

$ npm -v
6.10.1
```

```sh
npm install -g @vue/cli
```

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
