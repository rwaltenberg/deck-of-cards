import Vuex, { Store } from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'

import Deck from '@/utils/deck'
import DeckDetails from '@/views/Deck.vue'

describe('Deck.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  const mockDeckId = 'axj2sdfdc'
  let actions!: { fetchDeck: jest.Mock<any, any>}
  let store!: Store<any>
  let getters: { deck: () => Deck | null }

  beforeEach(() => {
    actions = { fetchDeck: jest.fn(async () => {}) }
    getters = {
      deck: () => (new Deck(['2H', '2D', '2C', '2S', '3H', '3D', '3C'], '2H', mockDeckId))
    }

    store = new Vuex.Store({ actions, getters })
  })

  it('does not try to fetch if already set on storage and route id matches', () => {
    const wrapper = shallowMount(
      DeckDetails,
      {
        store,
        localVue,
        mocks: {
          $route: {
            params: {
              id: mockDeckId
            }
          }
        }
      })

    expect(actions.fetchDeck).not.toHaveBeenCalled()
  })

  it('tries to fetch deck when there is none from store', () => {
    const emptyGetters = {
      deck: () => null
    }

    store = new Vuex.Store({ actions, getters: emptyGetters })

    const wrapper = shallowMount(
      DeckDetails,
      {
        store,
        localVue,
        mocks: {
          $route: {
            params: {
              id: mockDeckId
            }
          }
        }
      })

    expect(actions.fetchDeck).toHaveBeenCalled()
  })

  it('tries to fetch deck when deck id differs from route\'s deck id', () => {
    const wrapper = shallowMount(
      DeckDetails,
      {
        store,
        localVue,
        mocks: {
          $route: {
            params: {
              id: '3a2s1d5a3'
            }
          }
        }
      })

    expect(actions.fetchDeck).toHaveBeenCalled()
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(
      DeckDetails,
      {
        store,
        localVue,
        mocks: {
          $route: {
            params: {
              id: mockDeckId
            }
          }
        }
      })

    expect(wrapper).toMatchSnapshot()
  })
})
