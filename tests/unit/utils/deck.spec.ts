import Deck from '@/utils/deck'

jest.mock('@/api/deckofcards.ts', () => {
  return {
    DeckOfCards: {
      fetchDeck: async () => ({
        cards: [
          ['2', 'H'],
          ['2', 'D'],
          ['2', 'C'],
          ['2', 'S'],
          ['3', 'H'],
          ['3', 'D'],
          ['3', 'C']
        ],
        rotation: ['2', 'H']
      })
    }
  }
})

describe('deck.ts', () => {
  const cards = ['2H', '2D', '2C', '2S', '3H', '3D', '3C']
  const rotation = '2H'

  it('creates a deck from strings', () => {
    const deck = new Deck(cards, rotation)

    expect(deck).toBeInstanceOf(Deck)
    expect(deck.getCards()).toHaveLength(cards.length)
    expect(deck.getRotation()).toBeTruthy()
    expect(deck.persisted).toBe(false)
  })

  it('creates a deck from id', async () => {
    const id = 'as21das5d'
    const deck = await Deck.fromDeckId(id)

    expect(deck).toBeInstanceOf(Deck)
    expect(deck.persisted).toBe(true)
  })
})
