import { CardToString, StringToCard } from './card-conversion'
import sortCards, { rankCard, sortByRank } from './sort-cards'

import { DeckOfCards } from '@/api/deckofcards'
import combinations from './combinations'
import { isFullHouse } from './is-full-house'
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
    return sortCards(this.cards, this.rotation)
  }

  public getSortedString () {
    return this.getSortedCards().map(CardToString)
  }

  public getRotation () {
    return this.rotation.slice() as Card
  }

  public getFullHouses () {
    return sortBy(
      combinations(this.cards, 5)
        .filter(isFullHouse)
        .map(set => sortByRank(set, this.rotation)),
      set => set.reduce((sum, card) => sum + rankCard(card, this.rotation, [100, 1]), 0)
    )
  }

  public getFullHouseStrings () {
    return this.getFullHouses().map(f => f.map(CardToString).join(', '))
  }

  public async save (): Promise<void> {
    this.deckId = await DeckOfCards.saveDeck(this.cards, this.rotation)
  }
}

export default Deck
