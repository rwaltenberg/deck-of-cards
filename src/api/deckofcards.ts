import Axios from 'axios'
import { CardToString } from '@/utils/card-conversion'
import { uniq } from 'lodash'

interface NewDeckResponse {
  success: boolean;
  deck_id: string;
}

interface ListPileData {
  success: boolean;
  piles: { [name: string]: PileData };
}

interface PileData {
  cards: { code: string }[];
  remaining: number;
}

export interface DeckData {
  cards: string[];
  rotation: string;
}

export class DeckOfCards {
  private static readonly ENDPOINT: string = process.env.VUE_APP_API_ENDPOINT
  private static readonly http = Axios.create({ baseURL: DeckOfCards.ENDPOINT })

  public static async saveDeck (cards: readonly Card[], rotation: Card): Promise<string> {
    const cardStrings = cards.map(CardToString)
    const rotationString = CardToString(rotation)
    const cardsToAdd = uniq([...cardStrings, rotationString])

    const { data: createData } = await this.http.get<NewDeckResponse>(`deck/new?cards=${cardsToAdd.join(',')}`)

    if (!createData.success) {
      throw new Error('Deck creation failed')
    }

    const id = createData.deck_id

    const { data: drawData } = await this.http.get<NewDeckResponse>(`deck/${id}/draw?count=${cardsToAdd.length}`)

    if (!drawData.success) {
      throw new Error('Card drawing failed')
    }

    const { data: pileData } = await this.http.get(`deck/${id}/pile/table/add?cards=${cardStrings.join(',')}`)

    if (!pileData.success) {
      throw new Error('Pile card adding failed')
    }

    const { data: rotationPileData } = await this.http.get(`deck/${id}/pile/${cardStrings.includes(rotationString) ? 'included' : 'excluded'}/add?cards=${rotationString}`)

    if (!rotationPileData.success) {
      throw new Error('Rotation pile card adding failed')
    }

    return id
  }

  public static async fetchDeck (deckId: string): Promise<DeckData> {
    const { data } = await this.http.get<ListPileData>(`deck/${deckId}/pile/table/list`)

    if (!data.success || !data.piles.table || data.piles.table.cards.length < 2) {
      throw new Error('Pile fetching failed')
    }

    const rotationType = data.piles.included ? 'included' : 'excluded'

    const { data: rotationData } = await this.http.get<ListPileData>(`deck/${deckId}/pile/${rotationType}/list`)

    const cards = data.piles.table.cards.map(m => m.code)
    const rotation = rotationData.piles[rotationType].cards.map(m => m.code)[0]

    if (rotationType === 'included') {
      cards.push(rotation)
    }

    return {
      rotation,
      cards
    }
  }
}
