import rotateArray from '@/utils/rotate-array'

describe('rotate-array.ts', () => {
  it('rotates array properly', () => {
    const set = [1, 2, 3, 4, 5]
    let test

    test = rotateArray(set, 1)
    expect(test).toEqual([2, 3, 4, 5, 1])

    test = rotateArray(set, 2)
    expect(test).toEqual([3, 4, 5, 1, 2])

    test = rotateArray(set, -1)
    expect(test).toEqual([5, 1, 2, 3, 4])
  })
})
