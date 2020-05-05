export const Ranks = Object.freeze(['2', 'A', 'K', 'Q', 'J', '0', '9', '8', '7', '6', '5', '4', '3'] as Rank[])
export const Suits = Object.freeze(['H', 'D', 'C', 'S'] as Suit[])
export const SuitSymbols = Object.freeze({
  H: '♥',
  D: '♦',
  C: '♣',
  S: '♠'
})

export default {
  Ranks,
  Suits,
  Symbols: SuitSymbols
}
