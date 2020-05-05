import Vuex, { Store } from 'vuex'
import { Wrapper, createLocalVue, shallowMount } from '@vue/test-utils'

import Create from '@/views/Create.vue'

function setInputValue (input: Wrapper<Create>, value: string) {
  const el = input.element as HTMLInputElement
  el.value = value
  input.trigger('input')
}

describe('Create.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Create)
    expect(wrapper).toMatchSnapshot()
  })

  describe('Form submition', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    let actions!: { createDeck: jest.Mock }
    let store!: Store<any>

    beforeEach(() => {
      actions = { createDeck: jest.fn(async () => {}) }
      store = new Vuex.Store({ actions })
    })

    it('does not trigger "save" until there is at least one card and one rotation card', () => {
      const wrapper = shallowMount(Create, {
        store,
        localVue,
        mocks: {
          $router: { push: () => {} }
        }
      })

      const card = wrapper.find('#card0')
      const rotation = wrapper.find('#rotation')
      const form = wrapper.find('form').element as HTMLFormElement

      form.submit()
      expect(actions.createDeck).not.toBeCalled()

      setInputValue(card, 'AS')
      card.trigger('input')

      form.submit()
      expect(actions.createDeck).not.toBeCalled()

      setInputValue(rotation, 'AS')
      rotation.trigger('input')

      form.submit()
      expect(actions.createDeck).toBeCalled()

      expect(actions.createDeck).toHaveBeenCalledTimes(1)
    })

    it('triggers "save" only once until finished loading', () => {
      const wrapper = shallowMount(Create, {
        store,
        localVue,
        mocks: {
          $router: { push: () => {} }
        }
      })

      const card = wrapper.find('#card0')
      const rotation = wrapper.find('#rotation')
      const form = wrapper.find('form').element as HTMLFormElement

      setInputValue(card, 'AS')
      card.trigger('input')

      setInputValue(rotation, 'AS')
      rotation.trigger('input')

      form.submit()
      form.submit()

      expect(actions.createDeck).toHaveBeenCalledTimes(1)
    })
  })
})
