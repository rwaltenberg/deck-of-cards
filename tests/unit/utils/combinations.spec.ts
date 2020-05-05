import combinations from '@/utils/combinations'

describe('combinations.ts', () => {
  const set = [3, 2, 1]

  it('returns an empty array if k is 0', () => {
    const result = combinations<number>(set, 0)

    expect(result).toEqual([])
  })

  it('returns the elements of the set when k is 1', () => {
    const result = combinations<number>(set, 1)

    expect(result).toEqual([[3], [2], [1]])
  })

  it('returns the set itself when k equals to set\'s legth', () => {
    const result = combinations<number>(set, 3)

    expect(result).toStrictEqual(result)
  })

  it('returns the combinations correctly', () => {
    const result = combinations<number>(set, 2)

    expect(result).toEqual([[3, 2], [3, 1], [2, 1]])
  })
})
