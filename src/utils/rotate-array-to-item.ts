import rotateArray from './rotate-array'

export default function rotateArrayToItem<T> (array: readonly T[], item: T): T[] {
  const index = array.indexOf(item)

  if (index === -1) {
    throw new Error('Item not found')
  }

  return rotateArray(array, index)
}
