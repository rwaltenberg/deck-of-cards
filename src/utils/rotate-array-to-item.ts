import rotateArray from './rotate-array'

export default function rotateArrayToItem<T> (array: readonly T[], item: T): T[] {
  return rotateArray(array, array.indexOf(item))
}
