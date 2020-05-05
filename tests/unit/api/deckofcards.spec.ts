import { DeckOfCards } from '@/api/deckofcards'
import mockAxios from 'jest-mock-axios'
import { uniq } from 'lodash'
import { CardToString } from '@/utils/card-conversion'

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

  it('saves a deck to the api and returns it\'s id', async () => {
    const id = 'as32d1a3'
    const thenFn = jest.fn()
    const catchFn = jest.fn()

    const cards = [['A', 'H'], ['A', 'S']] as Card[]
    const rotation = ['A', 'C'] as Card
    const cardsToAdd = uniq([...cards.map(CardToString), CardToString(rotation)])

    DeckOfCards.saveDeck(cards, rotation)
      .then(thenFn)
      .catch(catchFn)

    expect(mockAxios.get).toHaveBeenCalledWith(`deck/new?cards=${cardsToAdd.join(',')}`)

    mockAxios.mockResponse({
      data: {
        success: true,
        deck_id: id // eslint-disable-line @typescript-eslint/camelcase
      }
    })

    await pause()

    expect(mockAxios.get).toHaveBeenCalledWith(`deck/${id}/draw?count=${cardsToAdd.length}`)

    mockAxios.mockResponse({
      data: {
        success: true
      }
    })

    await pause()

    expect(mockAxios.get).toHaveBeenCalledWith(`deck/${id}/pile/table/add?cards=${cards.map(CardToString).join(',')}`)

    mockAxios.mockResponse({
      data: {
        success: true
      }
    })

    await pause()

    expect(mockAxios.get).toHaveBeenCalledWith(`deck/${id}/pile/excluded/add?cards=${CardToString(rotation)}`)

    mockAxios.mockResponse({
      data: {
        success: true
      }
    })

    await pause()

    expect(thenFn).toHaveBeenCalledWith(id)

    expect(catchFn).not.toHaveBeenCalled()
  })
})
