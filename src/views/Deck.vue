<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Deck from '@/utils/deck'

@Component
export default class DeckDetails extends Vue {
  private deck: Deck | null = null

  async mounted () {
    this.deck = await Deck.fromDeckId(this.$route.params.id)
  }
}
</script>

<template>
  <div class="deck">
  </div>
</template>
