import Deck from '@/utils/deck'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deck: null as Deck | null
  },
  getters: {
    deck ({ deck }) {
      return deck
    }
  },
  mutations: {
    SET_DECK (state, deck: Deck | null) {
      state.deck = deck
    }
  },
  actions: {
    async createDeck ({ commit }, { cards, rotation }: { cards: string[]; rotation: string }) {
      const deck = new Deck(cards, rotation)
      await deck.save()

      commit('SET_DECK', deck)
      return deck.getId()
    },

    async fetchDeck ({ commit }, deckId: string) {
      commit('SET_DECK', null)

      const deck = await Deck.fromDeckId(deckId)
      commit('SET_DECK', deck)
    }
  }
})
