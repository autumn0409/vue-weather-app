<template>
  <div id="app" class="grid-container">
    <app-header class="header" v-bind:title="title"></app-header>
    <app-banner
      class="banner"
      v-bind:bannerMessage="messageToDisplay"
      v-bind:bannerType="messageType"
      v-on:clear-banner="clearMessage"
    ></app-banner>
    <app-weather-search class="weather-search" v-on:search-city="searchCity"></app-weather-search>
    <app-weather-results
      class="weather-results"
      v-bind="weatherData"
      v-if="validWeatherData"
      v-on:clear-weather-data="resetData"
    ></app-weather-results>
    <app-footer class="footer" v-bind:message="footerMessage"></app-footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import Banner from '@/components/Banner.vue'
import Search from '@/components/Search.vue'
import Weather from '@/components/Weather.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'app-banner': Banner,
    'app-weather-search': Search,
    'app-weather-results': Weather
  },
  data () {
    return {
      // Title of the application
      title: 'Vue Weather App',
      // Message to display in the footer
      footerMessage: 'testdriven.io 2020',
      // Weather data collected from openweathermap.org
      weatherData: {
        city: '',
        weatherSummary: '',
        weatherDescription: '',
        currentTemperature: 0.0,
        highTemperature: 0.0,
        lowTemperature: 0.0,
        group: 'na'
      },
      // Flag indicating if valid weather data has been loaded
      validWeatherData: false,
      // Message to display on banner
      messageToDisplay: '',
      // Message type (Info, Success, or Error) to display on banner
      messageType: 'Info',
      // API key from openweathermap.org - Unique to each person
      openweathermapApiKey: process.env.VUE_APP_OPEN_WEATHER_MAP_API_KEY
    }
  },
  created () {
    // Perform a check that the API key from openweathermap.org is defined
    if (this.openweathermapApiKey === undefined) {
      this.messageType = 'Error'
      this.messageToDisplay =
        'Error! API Key needs to be loaded to use openweathermap.org!'
    }
  },
  mounted () {
    this.$forceUpdate()
  },
  updated () {
    document.body.className = `weather-bg ${this.weatherData.group}`
  },
  methods: {
    searchCity (inputCity) {
      // GET request for user data
      const url = 'http://api.openweathermap.org/data/2.5/weather?q=' +
            inputCity +
            '&units=metric&APPID=' +
            this.openweathermapApiKey
      console.log(`Making request to: ${url}`)

      axios.get(url).then(response => {
        // handle success
        // this.messageType = 'Success'
        // this.messageToDisplay = 'SUCCESS! Weather data was retrieved for ' + response.data.name + '!'
        this.weatherData.city = response.data.name
        this.weatherData.weatherSummary = response.data.weather[0].main
        this.weatherData.weatherDescription =
            response.data.weather[0].description
        this.weatherData.currentTemperature = response.data.main.temp
        this.weatherData.lowTemperature = response.data.main.temp_min
        this.weatherData.highTemperature = response.data.main.temp_max
        this.validWeatherData = true
        this.weatherData.group = this.getWeatherGroup(response.data.weather[0].id)
      })
        .catch(error => {
          // handle error
          this.messageType = 'Error'
          this.messageToDisplay =
            'ERROR! Unable to retrieve weather data for ' + inputCity + '!'
          console.log(error.message)
          this.resetData()
        })
        .finally(response => {
          // always executed
          console.log('HTTP GET Finished!')
        })
    },
    resetData () {
      this.weatherData = {
        city: '',
        weatherSummary: '',
        weatherDescription: '',
        currentTemperature: 0.0,
        lowTemperature: 0.0,
        highTemperature: 0.0,
        group: 'na'
      }
      this.validWeatherData = false
    },
    clearMessage () {
      this.messageToDisplay = ''
      this.messageType = 'Info'
    },
    getWeatherGroup (code) {
      let group = 'na'
      if (code >= 200 && code < 300) {
        group = 'thunderstorm'
      } else if (code >= 300 && code < 400) {
        group = 'drizzle'
      } else if (code >= 500 && code < 600) {
        group = 'rain'
      } else if (code >= 600 && code < 700) {
        group = 'snow'
      } else if (code >= 700 && code < 800) {
        group = 'atmosphere'
      } else if (code === 800) {
        group = 'clear'
      } else if (code >= 801 && code < 900) {
        group = 'clouds'
      }
      return group
    }
  }
}
</script>

<style>
/* Overall Styling
 *****************/
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  background: #f1f3f5;
  color: #345;
  overflow-x: hidden;
}

/* CSS Grid Styling
*******************/
.header {
  grid-area: header;
  padding-top: 2rem;
}
.banner {
  grid-area: banner;
}
.weather-search {
  grid-area: search;
}
.weather-results {
  grid-area: results;
}
.footer {
  grid-area: footer;
}

.grid-container {
  display: grid;
  grid-template-columns: 10% 35% 35% 10%;
  grid-auto-rows: minmax(20px, auto);
  grid-gap: 10px;
  max-width: 1080px;
  margin: auto;
  grid-template-areas:
    "header   header     header    header"
    "banner   banner     banner    banner"
    "...      search     search    ..."
    "...      results    results   ..."
    "footer   footer     footer    footer";
}
</style>
