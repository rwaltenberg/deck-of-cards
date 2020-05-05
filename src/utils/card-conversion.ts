import { Ranks, Suits } from '@/config/deck'

export function StringToCard (str: string): Card {
  if (str.length !== 2) {
    throw new Error('String must have two characters')
  }

  const rank = str[0].toUpperCase() as Rank
  const suit = str[1].toUpperCase() as Suit

  if (!Ranks.includes(rank)) {
    throw new Error('The given rank is invalid')
  }

  if (!Suits.includes(suit)) {
    throw new Error('The given suit is invalid')
  }

  return [rank, suit]
}

export function CardToString (card: Card): string {
  return card.join('')
}
