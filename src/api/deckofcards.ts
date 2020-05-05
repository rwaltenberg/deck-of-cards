import { CardToString, StringToCard } from '@/utils/card-conversion'

import Axios from 'axios'

interface NewDeckResponse {
  success: boolean
  deck_id: string
}

interface ListPileData {
  success: boolean,
  piles: { [name: string]: PileData }
}

interface PileData {
  cards: { code: string }[]
  remaining: number
}

export interface DeckData {
  cards: string[]
  rotation: string
}

export class DeckOfCards {
  private static readonly ENDPOINT: string = process.env.VUE_APP_API_ENDPOINT
  private static readonly http = Axios.create({ baseURL: DeckOfCards.ENDPOINT })

  public static async saveDeck (cards: readonly Card[], rotation: Card): Promise<string> {
    const cardStrings = [...cards.map(CardToString), CardToString(rotation)]

    const { data: createData } = await this.http.get<NewDeckResponse>(`deck/new?cards=${cardStrings.join(',')}`)

    if (!createData.success) {
      throw new Error('Deck creation failed')
    }

    const id = createData.deck_id

    const { data: drawData } = await this.http.get<NewDeckResponse>(`deck/${id}/draw?count=${cardStrings.length}`)

    if (!drawData.success) {
      throw new Error('Card drawing failed')
    }

    const { data: pileData } = await this.http.get(`deck/${id}/pile/table/add?cards=${cardStrings.join(',')}`)

    if (!pileData.success) {
      throw new Error('Pile card adding failed')
    }

    return id
  }

  public static async fetchDeck (deckId: string): Promise<DeckData> {
    const { data } = await this.http.get<ListPileData>(`deck/${deckId}/pile/table/list`)

    if (!data.success || !data.piles.table || data.piles.table.cards.length < 2) {
      throw new Error('Pile fetching failed')
    }

    const cards = data.piles.table.cards.map(m => m.code)

    return {
      rotation: cards.pop()!,
      cards
    }
  }
}