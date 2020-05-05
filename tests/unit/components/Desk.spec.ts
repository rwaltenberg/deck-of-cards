import Desk from '@/components/Desk.vue'
import { shallowMount } from '@vue/test-utils'

describe('Desk.vue', () => {
  describe('with string type values', () => {
    it('renders properly', () => {
      const wrapper = shallowMount(Desk, {
        propsData: {
          value: ['AS', 'AC', 'AH', 'AD']
        }
      })
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('with Desk type values', () => {
    it('renders properly', () => {
      const wrapper = shallowMount(Desk, {
        propsData: {
          value: [['A', 'S'], ['A', 'C'], ['A', 'H'], ['A', 'D']]
        }
      })
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('with empty value', () => {
    it('renders properly', () => {
      const wrapper = shallowMount(Desk)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
