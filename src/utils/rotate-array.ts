export default function rotateArray<T> (array: readonly T[], steps: number): T[] {
  if (steps < 0) {
    return array.slice(steps).concat(array.slice(0, array.length + steps))
  }

  return array.slice(steps, array.length).concat(array.slice(0, steps))
}
