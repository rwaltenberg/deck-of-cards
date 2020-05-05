import { CardToString, StringToCard } from './card-conversion'
import { Ranks, Suits } from '@/config/deck'

import rotateArrayToItem from './rotate-array-to-item'
import { sortBy } from 'lodash'

export default class Deck {
  private rotation!: Card
  private cards: Card[] = []

  constructor (cards: string[], rotation: string) {
    this.cards = cards.map(StringToCard)
    this.rotation = StringToCard(rotation)
  }

  private get order () {
    return {
      Ranks: rotateArrayToItem(Ranks, this.rotation[0]),
      Suits: rotateArrayToItem(Suits, this.rotation[1])
    }
  }

  public getCards () {
    return this.cards.map(card => card.slice()) as Card[]
  }

  public getSortedCards () {
    return sortBy(this.cards, card => this.order.Suits.indexOf(card[1]) * 10 + this.order.Ranks.indexOf(card[0]))
  }

  public getSortedString () {
    return this.getSortedCards().map(CardToString)
  }

  public getRotation () {
    return this.rotation.slice() as Card
  }
}