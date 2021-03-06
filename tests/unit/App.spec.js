import { shallowMount, mount } from '@vue/test-utils'
import App from '@/App.vue'
import axios from 'axios'

// Mock the axios library
jest.mock('axios')

// Spy the console log
global.console.log = jest.fn()

describe('Implementation Test for App.vue with Successful HTTP GET', () => {
  let wrapper = null

  beforeEach(() => {
    const responseGet = {
      data:
      {
        name: 'Chicago',
        weather: [
          {
            id: 802,
            main: 'Cloudy',
            description: 'Cloudy with a chance of rain'
          }
        ],
        main: {
          temp: 25.3,
          temp_min: 24.44,
          temp_max: 26.11
        }
      }
    }

    // Set the mock call to GET to return a successful GET response
    axios.get.mockResolvedValue(responseGet)

    // render the component
    wrapper = shallowMount(App)
  })

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders sub-components when the component is created', () => {
    // check the name of the component
    expect(wrapper.name()).toMatch('app')

    // check that 4 of the 5 child components are rendered
    expect(wrapper.findAll('.header').exists()).toBeTruthy()
    expect(wrapper.findAll('.banner').exists()).toBeTruthy()
    expect(wrapper.findAll('.weather-display').exists()).toBeTruthy()
    expect(wrapper.findAll('.weather-search').exists()).toBeTruthy()
    expect(wrapper.findAll('.weather-results').exists()).toBeFalsy()

    // check that the user data is properly set
    expect(wrapper.vm.weatherData.city).toMatch(/^$/)
    expect(wrapper.vm.weatherData.weatherSummary).toMatch(/^$/)
    expect(wrapper.vm.weatherData.weatherDescription).toMatch(/^$/)
    expect(wrapper.vm.weatherData.currentTemperature).toEqual(0)
    expect(wrapper.vm.weatherData.lowTemperature).toEqual(0)
    expect(wrapper.vm.weatherData.highTemperature).toEqual(0)
    expect(wrapper.vm.weatherData.group).toMatch('na')
    expect(wrapper.vm.validWeatherData).toBe(false)
  })

  it('does load the weather data when a successful HTTP GET occurs', () => {
    wrapper.vm.searchCity('Chicago')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toBeCalledWith(expect.stringMatching(/Chicago/))

    wrapper.vm.$nextTick().then(function () {
      // check that the user data is properly set
      expect(wrapper.vm.weatherData.city).toMatch('Chicago')
      expect(wrapper.vm.weatherData.weatherSummary).toMatch('Cloudy')
      expect(wrapper.vm.weatherData.weatherDescription).toMatch('Cloudy with a chance of rain')
      expect(wrapper.vm.weatherData.currentTemperature).toEqual(25.3)
      expect(wrapper.vm.weatherData.lowTemperature).toEqual(24.44)
      expect(wrapper.vm.weatherData.highTemperature).toEqual(26.11)
      expect(wrapper.vm.weatherData.group).toMatch('clouds')
      expect(wrapper.vm.validWeatherData).toBe(true)
    })
  })

  it('resets the weather data when resetData() is called', () => {
    // set the input data for the user
    wrapper.setData({
      weatherData: {
        city: 'Boise',
        weatherSummary: 'Sunny',
        weatherDescription: 'No clouds in the sky',
        currentTemperature: 75.5,
        highTemperature: 78.6,
        lowTemperature: 48.9,
        group: 'clear'
      },
      validWeatherData: false
    })

    wrapper.vm.resetData()

    // check that the user data is properly set
    expect(wrapper.vm.weatherData.city).toMatch(/^$/)
    expect(wrapper.vm.weatherData.weatherSummary).toMatch(/^$/)
    expect(wrapper.vm.weatherData.weatherDescription).toMatch(/^$/)
    expect(wrapper.vm.weatherData.currentTemperature).toEqual(0)
    expect(wrapper.vm.weatherData.lowTemperature).toEqual(0)
    expect(wrapper.vm.weatherData.highTemperature).toEqual(0)
    expect(wrapper.vm.weatherData.group).toMatch('na')
    expect(wrapper.vm.validWeatherData).toBe(false)
  })

  it('resets the banner data when clearMessage() is called', () => {
    // set the input data for the user
    wrapper.setData(
      {
        messageToDisplay: 'Great search results!',
        messageType: 'Success!!!'
      }
    )

    wrapper.vm.clearMessage()

    // check that the banner message is reset
    expect(wrapper.vm.messageToDisplay).toMatch(/^$/)
    expect(wrapper.vm.messageType).toMatch('Info')
  })

  it('show error message when api key is undefined', () => {
    wrapper = shallowMount(App, {
      data () {
        return {
          openweathermapApiKey: undefined
        }
      }
    })

    // check the banner message
    expect(wrapper.vm.messageToDisplay).toMatch('Error! API Key needs to be loaded to use openweathermap.org!')
    expect(wrapper.vm.messageType).toMatch('Error')
  })
})

describe('Implementation Test for App.vue with Failed HTTP GET', () => {
  let wrapper = null

  beforeEach(() => {
    // Set the mock call to GET to return a failed GET request
    axios.get.mockRejectedValue(new Error('BAD REQUEST'))

    // Render the component
    wrapper = shallowMount(App)
  })

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('does not load the weather data when a failed HTTP GET occurs', () => {
    wrapper.vm.searchCity('Chicago')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toBeCalledWith(expect.stringMatching(/Chicago/))

    wrapper.vm.$nextTick().then(function () {
      // Check that there is no user data loaded when the GET request fails
      expect(wrapper.vm.weatherData.city).toMatch(/^$/)
      expect(wrapper.vm.weatherData.weatherSummary).toMatch(/^$/)
      expect(wrapper.vm.weatherData.weatherDescription).toMatch(/^$/)
      expect(wrapper.vm.weatherData.currentTemperature).toEqual(0)
      expect(wrapper.vm.weatherData.lowTemperature).toEqual(0)
      expect(wrapper.vm.weatherData.highTemperature).toEqual(0)
      expect(wrapper.vm.weatherData.group).toMatch('na')
      expect(wrapper.vm.validWeatherData).toBe(false)

      // check that the banner message indicates failure
      expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to retrieve weather data for Chicago!')
      expect(wrapper.vm.messageType).toMatch('Error')

      expect(global.console.log).toHaveBeenCalledWith('BAD REQUEST')
    })
  })
})

describe('Behavioral Test for App.vue with Successful HTTP GET', () => {
  let wrapper = null

  beforeEach(() => {
    const responseGet = {
      data:
      {
        name: 'Chicago',
        weather: [
          {
            id: '802',
            main: 'Cloudy',
            description: 'Cloudy with a chance of rain'
          }
        ],
        main: {
          temp: 25.3,
          temp_min: 24.44,
          temp_max: 26.11
        }
      }
    }

    // Set the mock call to GET to return a successful GET response
    axios.get.mockResolvedValue(responseGet)

    // render the component (including all sub-components)
    wrapper = mount(App)
  })

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('initializes with the two buttons disabled and no weather data displayed', () => {
    // check that 2 buttons are created and are disabled
    expect(wrapper.findAll('button').length).toEqual(2)
    expect(wrapper.findAll('button').at(0).text()).toMatch('Search')
    expect(wrapper.findAll('button').at(1).text()).toMatch('Clear')
    expect(wrapper.findAll('button').at(0).element.disabled).toBeTruthy()
    expect(wrapper.findAll('button').at(1).element.disabled).toBeTruthy()

    // check that there is only 1 h2 element
    expect(wrapper.findAll('h2').length).toEqual(1)
    expect(wrapper.findAll('h2').at(0).text()).toMatch('Weather Search')

    // check that 0 fields of weather data are displayed
    expect(wrapper.findAll('.weather-results').exists()).toBeFalsy()

    // check that background image is correctly rendered
    expect(document.body.className).toMatch('weather-bg na')
  })

  it('displays the weather data for a valid search', () => {
    // Set the input data
    wrapper.findAll('input').at(0).setValue('Chicago')

    // check that the 2 buttons are enabled
    expect(wrapper.findAll('button').length).toEqual(2)
    expect(wrapper.findAll('button').at(0).text()).toMatch('Search')
    expect(wrapper.findAll('button').at(1).text()).toMatch('Clear')
    expect(wrapper.findAll('button').at(0).element.disabled).toBeFalsy()
    expect(wrapper.findAll('button').at(1).element.disabled).toBeFalsy()

    // trigger an event when the 'Search' button is clicked
    wrapper.findAll('button').at(0).trigger('click')

    wrapper.vm.$nextTick().then(function () {
      // check that the heading text is rendered
      expect(wrapper.findAll('h2').length).toEqual(2)
      expect(wrapper.findAll('h2').at(0).text()).toMatch('Weather Summary')
      expect(wrapper.findAll('h2').at(1).text()).toMatch('Temperatures')

      // check that 6 fields of weather data are displayed
      expect(wrapper.findAll('.weather-results').exists()).toBeTruthy()
      const weatherResults = wrapper.findAll('.weather-results').at(0)
      expect(weatherResults.findAll('p').length).toEqual(6)
      expect(weatherResults.at(0).text()).toMatch('City: Chicago')
      expect(weatherResults.at(1).text()).toMatch('Summary: Cloudy')
      expect(weatherResults.at(2).text()).toMatch('Details: Cloudy with a chance of rain')
      expect(weatherResults.at(3).text()).toMatch('Current: 25.3° C')
      expect(weatherResults.at(4).text()).toMatch('High (Today): 26.11° C')
      expect(weatherResults.at(5).text()).toMatch('Low (Today): 24.44° C')

      // check that the 3 buttons are enabled
      expect(wrapper.findAll('button').length).toEqual(3)
      expect(wrapper.findAll('button').at(0).text()).toMatch('Search')
      expect(wrapper.findAll('button').at(1).text()).toMatch('Clear')
      expect(wrapper.findAll('button').at(2).text()).toMatch('Clear Weather Data')
      expect(wrapper.findAll('button').at(0).element.disabled).toBeFalsy()
      expect(wrapper.findAll('button').at(1).element.disabled).toBeFalsy()
      expect(wrapper.findAll('button').at(1).element.disabled).toBeFalsy()

      // check that background image is correctly rendered
      expect(document.body.className).toMatch('weather-bg clouds')
    })
  })

  it('displays the correct background image', () => {
    const setGroup = (groupName) => {
      wrapper.setData({
        weatherData: {
          ...wrapper.vm.weatherData,
          group: groupName
        }
      })
    }

    setGroup(wrapper.vm.getWeatherGroup(201))
    expect(document.body.className).toMatch('weather-bg thunderstorm')

    setGroup(wrapper.vm.getWeatherGroup(300))
    expect(document.body.className).toMatch('weather-bg drizzle')

    setGroup(wrapper.vm.getWeatherGroup(501))
    expect(document.body.className).toMatch('weather-bg rain')

    setGroup(wrapper.vm.getWeatherGroup(600))
    expect(document.body.className).toMatch('weather-bg snow')

    setGroup(wrapper.vm.getWeatherGroup(702))
    expect(document.body.className).toMatch('weather-bg atmosphere')

    setGroup(wrapper.vm.getWeatherGroup(800))
    expect(document.body.className).toMatch('weather-bg clear')

    setGroup(wrapper.vm.getWeatherGroup(803))
    expect(document.body.className).toMatch('weather-bg clouds')
  })
})
