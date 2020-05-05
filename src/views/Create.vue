<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Deck from '@/utils/deck'

@Component
export default class Create extends Vue {
  cards = (new Array(10)).fill('').map((c, i) => ({ index: i, value: '' }))
  rotation = { value: '' }
  loading = false

  async save () {
    const cards = this.cards.filter(card => card.value).map(card => card.value)
    const rotation = this.rotation.value

    if (!cards.length || !rotation || this.loading) {
      return
    }

    this.loading = true
    const deck = new Deck(cards, rotation)

    try {
      await deck.save()
      this.$router.push({ name: 'Deck', params: { id: deck.getId() || '' } })
    } catch (error) {
      console.error(error)
      this.loading = false
    }
  }
}
</script>

<template>
  <form class="create" @submit.prevent="save">
    <div class="cards">
      <div class="card" v-for="card in cards" :key="`card${card.index}`">
        <label :for="`card${card.index}`">Card {{ card.index + 1 }}</label>
        <input :id="`card${card.index}`" type="text" maxlength="2" v-model="card.value" placeholder="Enter card">
      </div>
    </div>
    <div class="rotation">
      <div class="card">
        <label for="rotation">Rotation Card</label>
        <input id="rotation" type="text" maxlength="2" v-model="rotation.value" placeholder="Enter card">
      </div>
    </div>
    <button class="submit" type="submit">Submit</button>
  </form>
</template>

<style lang="scss" scoped>
.create {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  max-width: 1280px;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .card {
    flex: 0 0 calc(20% - 5px);
    margin-bottom: rem(25px);

    label {
      color: #AAA;
      display: block;
      font-size: rem(10px);
      font-weight: bold;
      margin-bottom: rem(5px);
      text-transform: uppercase;
    }

    input {
      display: block;
      width: 100%;
    }
  }
}

.card {
  input {
    border: 1px solid #CCC;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(#CCC, .5);
    box-sizing: border-box;
    display: inline-block;
    font-size: rem(14px);
    line-height: 1;
    padding: rem(7px) rem(10px);
    text-transform: uppercase;

    &::placeholder {
      text-transform: none;
    }
  }
}

.rotation {
  margin: 50px 0 300px;
  width: calc(60% - 5px);

  .card {
    label {
      box-sizing: border-box;
      display: inline-block;
      font-size: rem(24px);
      font-weight: bold;
      margin-right: 3px;
      padding-right: 10px;
      text-align: right;
      vertical-align: bottom;
      width: calc(100% / 3 - 5px);
    }

    input {
      margin: 0 5px;
      width: calc(100% / 3 - 5px);
    }
  }
}

.submit {
  background-color: #190057;
  border: 0;
  border-radius: 15px;
  color: #f1e622;
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: rem(24px);
  font-weight: bold;
  padding: 8px 30px;
}
</style>
