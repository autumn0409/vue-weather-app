## Overview

The Vue Weather App is the application created for the following blog post on [TestDriven.io](https://testdriven.io):

[A Guide to Unit Testing Vue Components](https://testdriven.io/blog/)

## Description

The Vue Weather App allows the user to search for the current weather for a city.  This application was developed to provide examples of how to unit test Vue components.

## Example

![Alt text](/blogpost_screenshots/VueWeatherApp_Walkthrough_Step4.png?raw=true "Vue Weather App Example")

## Installation Instructions

### Setting Up a Vue Project using the Vue CLI

The Vue CLI is the recommended tool for developing Vue applications.  The goal of the Vue CLI is to allow you to easily create a Vue project and start developing right away.

#### Installing the Vue CLI

The Vue CLI requires the following tools be installed first (pre-requisites):

* Node (JavaScript runtime)
* npm (Node Package Manager)

The Vue CLI is a package that you install using `npm`.  Instead of creating a whole new toolchain for the Vue CLI, the creators of the tool are taking advantage of an existing ecosystem (npm) to develop the set of tools to help develop Vue applications.

The first step in this installation process is downloading Node and npm (Node Package Manager); they are conveniently installed together.

As of January 2020, the Vue CLI requires that you have Node v8.9 or higher.  To install Node and npm, start by going to the [NodeJS website](https://nodejs.org/en/):

![Alt text](/blogpost_screenshots/Chapter12_NodeJS_Website.png?raw=true "NodeJS Website")

I would recommend installing the current LTS (Long-Term Support) version of Node.  We are using Node to help us install the Vue CLI, so we don't need the latest features of Node.  It's best to stick with a stable build for this situation.

Once you download the installation file, you should see a window similar to this:

![Alt text](/blogpost_screenshots/Chapter12_NodeJS_Installation.png?raw=true "NodeJS Installation")

This installation window is for MacOS, but it illustrates that Node and npm are being installed together.

Follow the instructions for installing Node/npm, which will be different depending on the operating system (MacOS, Windows, Linux, etc.) that you are using.

After the installation is complete, you can check that Node is installed by going to your command line (i.e., terminal) and checking the version of Node and npm that are installed:

```sh
$ node -v
v10.16.0

$ npm -v
6.10.1
```

Now that Node and npm are installed, we are ready to install the Vue CLI.  The installation of the Vue CLI requires administrative privileges (so you may need to run with 'sudo'):

```sh
$ npm install -g @vue/cli
```

This command to install the Vue CLI is using `npm` to globally (`-g` flag) install the Vue CLI package.

> Note: These installation instructions assume that you are performing a new installation of the Vue CLI.
>
> There was a significant change in the Vue CLI between v2 and v3, as the package name changed from vue-cli to @vue/cli.
>
> If you worked with the older version (v1.x or v2.x) of the Vue CLI in the past, you need to uninstall it first using:
>   `npm uninstall vue-cli -g`

After the installation is complete, you can check that you have access to the `vue` command:

```sh
$ vue --version
3.9.2
```

#### Working with the Vue Weather App

If you would like to run the Vue Weather App on your local machine, you will need to follow these instructions:

```sh
$ git clone git@gitlab.com:patkennedy79/vue-weather-app.git
$ cd vue-weather-app
$ sudo npm install
```

The installation of the Vue CLI requires administrative privileges (so you may need to run with 'sudo').

Additionally, you will need to create a free account at [Open Weather](https://openweathermap.org) and get an API key for using their API service.  The API key can be found in your account page under the 'API Keys' tab.  The API key needs to be included in the `App` component (defined in /src/App.vue) in the data section:

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

VueJS Documentation: https://vuejs.org/v2/guide/
