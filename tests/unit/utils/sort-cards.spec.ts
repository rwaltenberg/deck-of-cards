import sortCards, { rankCard, sortByRank } from "@/utils/sort-cards"

const cards: Card[] = [
  ['2', 'H'],
  ['2', 'D'],
  ['2', 'C'],
  ['2', 'S'],
  ['3', 'H'],
  ['3', 'D'],
  ['3', 'C']
]

const rotation: Card = ['2', 'H']

describe('sort-cards.ts', () => {
  describe('rankCard', () => {
    it('ranks cards properly', () => {
      const expectedRanks = [0, 100, 200, 300, 12, 112, 212]

      cards.forEach((card, index) => {
        const rank = rankCard(card, rotation)
        expect(rank).toEqual(expectedRanks[index])
      })
    })

    describe('with custom weights', () => {
      it('ranks cards properly', () => {
        const expectedRanks = [0, 10, 20, 30, 1200, 1210, 1220]

        cards.forEach((card, index) => {
          const rank = rankCard(card, rotation, [100, 10])
          expect(rank).toEqual(expectedRanks[index])
        })
      })
    })
  })

  describe('sortCards', () => {
    it('sorts cards properly', () => {
      const expectedSort = [
        ['2', 'H'],
        ['3', 'H'],
        ['2', 'D'],
        ['3', 'D'],
        ['2', 'C'],
        ['3', 'C'],
        ['2', 'S']
      ]

      const sortedSet = sortCards(cards, rotation)
      expect(sortedSet).toEqual(expectedSort)
    })
  })

  describe('sortByRank', () => {
    it('sorts cards by their ranks first', () => {
      const expectedSort = [
        ['2', 'H'],
        ['2', 'D'],
        ['2', 'C'],
        ['2', 'S'],
        ['3', 'H'],
        ['3', 'D'],
        ['3', 'C']
      ]

      const sortedSet = sortByRank(cards, rotation)
      expect(sortedSet).toEqual(expectedSort)
    })
  })
})