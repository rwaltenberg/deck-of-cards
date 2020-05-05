import { DeckOfCards } from '@/api/deckofcards'
import mockAxios from 'jest-mock-axios'

const pause = (timeout = 0) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

describe('deckofcards.ts', () => {
  afterEach(() => {
    mockAxios.reset()
  })

  it('fetches a deck from the api and returns it\'s contents', async () => {
    const id = 'as32d1a3'
    const thenFn = jest.fn()
    const catchFn = jest.fn()

    DeckOfCards.fetchDeck(id)
      .then(thenFn)
      .catch(catchFn)

    expect(mockAxios.get).toHaveBeenCalledWith(`deck/${id}/pile/table/list`)

    mockAxios.mockResponse({
      data: {
        success: true,
        piles: {
          table: {
            cards: [{ code: 'AH' }, { code: 'AS' }]
          },
          included: {}
        }
      }
    })

    await pause()

    expect(mockAxios.get).toHaveBeenCalledWith(`deck/${id}/pile/included/list`)

    mockAxios.mockResponse({
      data: {
        success: true,
        piles: {
          table: {},
          included: {
            cards: [{ code: 'AC' }]
          }
        }
      }
    })

    await pause()

    expect(thenFn).toHaveBeenCalledWith({
      cards: ['AH', 'AS', 'AC'],
      rotation: 'AC'
    })

    expect(catchFn).not.toHaveBeenCalled()
  })
})
