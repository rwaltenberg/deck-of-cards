declare type Rank = 'K' | 'Q' | 'J' | '10' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2' | 'A'
declare type SuitCode = 'H' | 'D' | 'C' | 'S'
declare type Card = [Rank, SuitCode]
declare interface Suit {
  code: SuitCode;
  symbol: string;
  color: string;
}
