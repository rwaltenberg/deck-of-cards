<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import DeckCard from './Card.vue'
import { StringToCard } from '../utils/card-conversion'

@Component({
  components: {
    DeckCard
  }
})
export default class Desk extends Vue {
  @Prop({ type: Array, default: () => [] })
  private value!: (Card | string)[]

  get cards () {
    return this.value.map(card => Array.isArray(card) ? card : StringToCard(card))
  }
}
</script>

<template>
  <ul class="desk">
    <deck-card v-for="card in cards" :key="card.join('')" :value="card" tag="li" />
  </ul>
</template>

<style lang="scss" scoped>
  .desk {
    align-items: flex-start;
    background-color: #d3d3d3;
    border: 2px solid #888888;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    min-height: 580px;
    list-style: none;
    margin: 0;
    padding: 0 25px;
    width: 1000px;

    .card {
      flex: 0 0 auto;
      margin: 24px;
    }
  }
</style>
