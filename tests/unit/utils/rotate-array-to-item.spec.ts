import rotateArrayToItem from '@/utils/rotate-array-to-item'

describe('rotate-array.ts', () => {
  const set = [1, 2, 3, 4, 5]

  it('rotates array to item if found', () => {
    const test = rotateArrayToItem(set, 5)

    expect(test).toEqual([5, 1, 2, 3, 4])
  })

  it('fails if item not found', () => {
    expect.assertions(1)

    try {
      rotateArrayToItem(set, 6)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
