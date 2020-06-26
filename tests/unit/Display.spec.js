import { shallowMount } from '@vue/test-utils'
import Display from '@/components/Display.vue'

describe('Icon.vue Implementation Test', () => {
  let wrapper = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    wrapper = shallowMount(Display, {
      propsData: {
        group: 'na',
        description: '',
        temp: 0.0
      }
    })
  })

  // TEARDOWN - run after to each unit test
  afterEach(() => {
    wrapper.destroy()
  })

  it('initializes with correct element', () => {
    // check the name of the component
    expect(wrapper.name()).toMatch('Display')

    // check that each props of the component is initialized
    expect(wrapper.vm.group).toMatch('na')
    expect(wrapper.vm.description).toMatch(/^$/)
    expect(wrapper.vm.temp).toBe(0.0)

    // check that image is not rendered
    expect(wrapper.findAll('img').length).toEqual(0)

    // check that data for the dicription isn't displayed
    expect(wrapper.findAll('p').length).toEqual(0)

    // check that data for the temperature isn't displayed
    expect(wrapper.findAll('h1').length).toEqual(0)

    // check that weather search header is displayed
    expect(wrapper.findAll('h2').length).toEqual(1)
    expect(wrapper.findAll('h2').at(0).text()).toMatch('Weather Search')
  })

  it('processes valid props data', () => {
    // render the component
    wrapper.setProps({
      group: 'rain',
      description: 'Light Rain',
      temp: 27
    })

    // check the name of the component
    expect(wrapper.name()).toMatch('Display')

    // check that each props of the component is setted
    expect(wrapper.vm.group).toMatch('rain')
    expect(wrapper.vm.description).toMatch('Light Rain')
    expect(wrapper.vm.temp).toBe(27)

    // check that image is correctly rendered
    expect(wrapper.findAll('img').length).toEqual(1)
    expect(wrapper.findAll('img').at(0).attributes('src')).toMatch('images/w-rain.png')

    // check that data for the dicription is displayed
    expect(wrapper.findAll('p').length).toEqual(1)
    expect(wrapper.findAll('p').at(0).text()).toMatch('Light Rain')

    // check that data for the temperature is displayed
    expect(wrapper.findAll('h1').length).toEqual(1)
    expect(wrapper.findAll('h1').at(0).text()).toMatch('27º C')

    // check that weather search header isn't displayed
    expect(wrapper.findAll('h2').length).toEqual(0)
  })
})
