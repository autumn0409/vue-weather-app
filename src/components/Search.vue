<template>
  <div class="weather-search">
    <div class="weather-search-input">
      <input
        type="text"
        id="cityInput"
        v-model="inputCity"
        v-on:keyup.enter="searchCity"
        placeholder="Enter a city name..."
      />
      <br />
      <div class="weather-search-buttons">
        <button type="submit" v-on:click="searchCity" v-bind:disabled="searchDisabled">Search</button>
        <button type="reset" v-on:click="clearCity" v-bind:disabled="clearDisabled">Clear</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      inputCity: ''
    }
  },
  methods: {
    searchCity () {
      this.$emit('search-city', this.inputCity)
    },
    clearCity () {
      // this.$emit('reset-city')
      this.inputCity = ''
    }
  },
  computed: {
    searchDisabled () {
      if (this.inputCity) {
        return false
      } else {
        return true
      }
    },
    clearDisabled () {
      if (this.inputCity) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Weather Search Styling
*************************/
.weather-search {
  margin: auto;
}

.weather-search-buttons {
  margin: 0.5em;
}

.weather-search-input {
  text-align: center;
}

.weather-search-input input {
  font-size: 1.1em;
}

.weather-search-buttons button {
  background-color: rgb(0, 162, 255);
  color: white;
  padding: 8px 16px;
  text-align: center;
  font-size: 1em;
  border-radius: 8px;
  border: none;
  margin: 6px;
  width: 5rem;
}

.weather-search-buttons button:hover {
  color: black;
  cursor: pointer;
}

.weather-search-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
