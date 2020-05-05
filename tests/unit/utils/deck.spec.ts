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
      }),
      saveDeck: async () => 'as21das5d'
    }
  }
})

describe('deck.ts', () => {
  const cards = ['2H', '2D', '2C', '2S', '3H', '3D', '3C']
  const rotation = '2H'

  it('creates a deck from strings and saves it', async () => {
    expect.assertions(6)

    const expectedId = 'as21das5d'
    const deck = new Deck(cards, rotation)

    expect(deck).toBeInstanceOf(Deck)
    expect(deck.getCards()).toHaveLength(cards.length)
    expect(deck.getRotation()).toBeTruthy()
    expect(deck.persisted).toBe(false)

    await deck.save()

    expect(deck.persisted).toBe(true)
    expect(deck.getId()).toEqual(expectedId)
  })

  it('creates a deck from id', async () => {
    expect.assertions(2)

    const id = 'as21das5d'
    const deck = await Deck.fromDeckId(id)

    expect(deck).toBeInstanceOf(Deck)
    expect(deck.persisted).toBe(true)
  })
})
