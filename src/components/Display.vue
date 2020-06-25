<template>
  <div class="weather-display">
    <img :src="'images/w-' + group + '.png'" alt />
    <p class="description">{{ description }}</p>
    <h1 class="temp" v-if="group != 'na'">
      <span class="display-3">{{ temp.toFixed(0) }}&ordm;</span>
      &nbsp;C
    </h1>
  </div>
</template>

<script>
export default {
  name: 'Display',
  props: {
    group: String,
    description: String,
    temp: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Weather Display Styling
**************************/
.weather-display {
  color: #fff;
  text-align: center;
  text-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3), 0 0 1rem rgba(0, 0, 0, 0.7);
  position: relative;

  transition: all 0.3s;
  opacity: 1;
}

.weather-display .description {
  position: absolute;
  margin: 0 auto;
  top: 0rem;
  right: 2rem;
  text-transform: capitalize;
  opacity: 0.7;
  font-size: 1.3rem;
}

.weather-display .temp {
  position: absolute;
  margin: 0 auto;
  bottom: 1rem;
  left: 2rem;
}

.weather-display img {
  display: block;
  width: 100%;
  max-width: 20rem;
  margin: 0 auto;
}
</style>
