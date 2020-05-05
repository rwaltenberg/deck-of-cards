import { chain } from 'lodash'

export function isFullHouse (set: readonly Card[]) {
  const counts = chain(set)
    .countBy(card => card[0])
    .values()
    .sort()
    .value()

  return counts.length === 2 && counts[0] === 2
}
