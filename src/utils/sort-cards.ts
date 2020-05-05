import { Ranks, Suits } from '@/config/deck'

import rotateArrayToItem from './rotate-array-to-item'
import { sortBy } from 'lodash'

export function rankCard (card: Card, rotation: Card, weights: [number, number] = [1, 100]) {
  // Since Card[1] only accepts strings contained on SuitCode type,
  // rotationSuit is definetly non-null.
  //
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const rotationSuit = Suits.find(s => s.code === rotation[1])!

  const order = {
    Ranks: rotateArrayToItem(Ranks, rotation[0]),
    Suits: rotateArrayToItem(Suits, rotationSuit)
  }

  return order.Ranks.findIndex(r => r === card[0]) * weights[0] + order.Suits.findIndex(s => s.code === card[1]) * weights[1]
}

export function sortCards (set: readonly Card[], rotation: Card) {
  return sortBy(set, card => rankCard(card, rotation))
}

export function sortByRank (set: readonly Card[], rotation: Card) {
  return sortBy(set, card => rankCard(card, rotation, [100, 1]))
}

export default sortCards
