import { StringToCard } from '@/utils/card-conversion'

describe('card-conversion.ts', () => {
  describe('StringToCard', () => {
    it('converts correctly', () => {
      const card = StringToCard('AS')

      expect(card).toEqual(['A', 'S'])
    })

    it('fails if string has more or less than two characters', () => {
      expect.assertions(1)

      try {
        StringToCard('ASD')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })

    it('fails if invalid rank', () => {
      expect.assertions(1)

      try {
        StringToCard('BS')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })

    it('fails if invalid suit', () => {
      expect.assertions(1)

      try {
        StringToCard('AB')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
  })
})
