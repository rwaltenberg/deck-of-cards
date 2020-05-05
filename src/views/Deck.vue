<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Deck from '@/utils/deck'
import Desk from '@/components/Desk.vue'

@Component({
  components: {
    Desk
  }
})
export default class DeckDetails extends Vue {
  get deck () {
    return this.$store.getters.deck as Deck | null
  }

  get sorted () {
    return this.deck && {
      cards: this.deck.getSortedCards(),
      string: this.deck.getSortedString()
    }
  }

  get fullHouses () {
    return this.deck && this.deck.getFullHouseStrings()
  }

  @Watch('$route.params.id', { immediate: true })
  async fetch () {
    const id = this.$route.params.id

    if (this.deck && this.deck.getId() === id) {
      return
    }

    try {
      this.$store.dispatch('fetchDeck', id)
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<template>
  <div v-if="deck" class="deck">
    <desk :value="sorted.cards" />

    <dl class="stats">
      <dt>High Card:</dt>
      <dd>{{ sorted.string[0] }}</dd>
      <dt>Full House Combo:</dt>
      <dd :class="{ 'has-full-houses': fullHouses.length }">
        <template v-if="!fullHouses.length">None</template>
        <ol class="full-houses" v-else>
          <li v-for="set in fullHouses" :key="set">{{ set }}</li>
        </ol>
      </dd>
    </dl>
  </div>
</template>

<style lang="scss" scoped>
  .deck {
    margin-top: 50px;

    .desk {
      margin: 0 auto 30px;
    }

    .stats {
      font-size: rem(32px);
      margin: 0 auto;
      width: 730px;

      dt {
        float: left;
        clear: both;
        font-weight: bold;
      }

      dd {
        float: left;
        margin-left: rem(10px);

        &.has-full-houses {
          clear: both;
          float: none;
          display: block;
        }
      }

      .full-houses {
        margin: 0;
        list-style-type: lower-roman;
      }
    }
  }
</style>
