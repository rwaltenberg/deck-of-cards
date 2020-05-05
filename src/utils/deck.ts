import { CardToString, StringToCard } from './card-conversion'
import { Ranks, Suits } from '@/config/deck'

import { DeckOfCards } from '@/api/deckofcards'
import rotateArrayToItem from './rotate-array-to-item'
import { sortBy } from 'lodash'

export class Deck {
  private deckId?: string
  private rotation!: Card
  private cards: Card[] = []

  constructor (cards: string[], rotation: string, deckId?: string) {
    this.cards = cards.map(StringToCard)
    this.rotation = StringToCard(rotation)
    this.deckId = deckId
  }

  private get order () {
    return {
      Ranks: rotateArrayToItem(Ranks, this.rotation[0]),
      Suits: rotateArrayToItem(Suits, this.rotation[1])
    }
  }

  public get persisted () {
    return Boolean(this.deckId)
  }

  public static async fromDeckId (deckId: string): Promise<Deck> {
    const { cards, rotation } = await DeckOfCards.fetchDeck(deckId)

    return new Deck(cards, rotation, deckId)
  }

  public getId () {
    return this.deckId
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

  public async save (): Promise<void> {
    this.deckId = await DeckOfCards.saveDeck(this.cards, this.rotation)
  }
}

export default Deck
