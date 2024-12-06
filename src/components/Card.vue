<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { StringToCard } from '../utils/card-conversion'
import { Suits } from '../config/deck'

@Component
export default class DeckCard extends Vue {
  @Prop({ type: [Array, String], required: true })
  private value!: Card | string

  @Prop({ type: String, default: () => 'div' })
  private tag!: string

  get card (): Card {
    if (Array.isArray(this.value)) {
      return this.value.slice(0) as Card
    }

    return StringToCard(this.value)
  }

  getSuit (code: SuitCode) {
    // Since code only accepts strings contained on SuitCode type, suit is
    // definetly non-null.
    //
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const suit = Suits.find(s => s.code === code)!

    return suit
  }
}
</script>

<template>
  <component :is="tag" class="card">
    <div class="value" :style="{ color: getSuit(card[1]).color }">
      <div class="rank">{{ card[0] }}</div>
      <div class="suit">{{ getSuit(card[1]).symbol }}</div>
    </div>
    <div class="value mirror" :style="{ color: getSuit(card[1]).color }">
      <div class="rank">{{ card[0] }}</div>
      <div class="suit">{{ getSuit(card[1]).symbol }}</div>
    </div>
  </component>
</template>

<style lang="scss" scoped>
  .card {
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 5px 5px 10px #9182a1;
    box-sizing: border-box;
    overflow: hidden;
    padding: 10px 20px;

    .value {
      align-items: flex-start;
      display: flex;
      font-family: Arial, serif;
      font-size: rem(32px);
      font-weight: bold;
      line-height: 1;
      height: 110px;
      width: 100px;

      &.mirror {
        transform: scale(-1);
      }

      .rank {
        line-height: rem(55px);
        margin-right: 5px;
      }

      .suit {
        font-size: rem(50px);
      }
    }
  }
</style>
