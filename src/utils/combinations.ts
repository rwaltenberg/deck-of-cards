// From this gist: https://gist.github.com/axelpale/3118596

export function combinations<T> (set: readonly T[], k: number) {
  if (k > set.length || k <= 0) {
    return []
  }

  if (k === set.length) {
    return [set]
  }

  if (k === 1) {
    return set.reduce((acc, cur) => [...acc, [cur]], [] as T[][])
  }

  const combs = [] as T[][]
  let tailCombs = []

  for (let i = 0; i <= set.length - k + 1; i++) {
    tailCombs = combinations(set.slice(i + 1), k - 1)
    for (let j = 0; j < tailCombs.length; j++) {
      combs.push([set[i], ...tailCombs[j]])
    }
  }

  return combs
}

export default combinations
