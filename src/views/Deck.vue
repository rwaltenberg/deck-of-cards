<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Deck from '@/utils/deck'
import Desk from '@/components/Desk.vue'

@Component({
  components: {
    Desk
  }
})
export default class DeckDetails extends Vue {
  private deck: Deck | null = null

  get sorted () {
    return this.deck && {
      cards: this.deck.getSortedCards(),
      string: this.deck.getSortedString()
    }
  }

  async mounted () {
    try {
      this.deck = await Deck.fromDeckId(this.$route.params.id)
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
      <dd>
        <ul class="full-houses"></ul>
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
      }
    }
  }
</style>
