export const Ranks = Object.freeze(['2', 'A', 'K', 'Q', 'J', '0', '9', '8', '7', '6', '5', '4', '3'] as Rank[])
export const Suits = Object.freeze([
  {
    code: 'H',
    symbol: '♥',
    color: '#c52b25'
  },
  {
    code: 'D',
    symbol: '♦',
    color: '#c52b25'
  },
  {
    code: 'C',
    symbol: '♣',
    color: '#000000'
  },
  {
    code: 'S',
    symbol: '♠',
    color: '#000000'
  }
] as Suit[])

export default {
  Ranks,
  Suits
}
