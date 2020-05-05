import Card from '@/components/Card.vue'
import { shallowMount } from '@vue/test-utils'

describe('Card.vue', () => {
  describe('with string type value', () => {
    it('renders properly', () => {
      const wrapper = shallowMount(Card, {
        propsData: {
          value: 'AS'
        }
      })
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('with Card type value', () => {
    it('renders properly', () => {
      const wrapper = shallowMount(Card, {
        propsData: {
          value: ['A', 'S']
        }
      })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
