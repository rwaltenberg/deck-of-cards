import { isFullHouse } from "@/utils/is-full-house"

describe('is-full-house.ts', () => {
  it('returns true if set is a full house', () => {
    const result = isFullHouse([
      ['2', 'H'],
      ['2', 'C'],
      ['2', 'S'],
      ['3', 'H'],
      ['3', 'C']
    ])

    expect(result).toBe(true)
  })

  it('returns false if set is NOT a full house', () => {
    const result = isFullHouse([
      ['2', 'H'],
      ['2', 'C'],
      ['2', 'S'],
      ['3', 'H'],
      ['A', 'C']
    ])

    expect(result).toBe(false)
  })
})
