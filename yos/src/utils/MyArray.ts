export function range(n1: number, n2?: number, term = 1) {
  let [from, to] = typeof n2 === "number" ? [n1, n2] : [0, n1];
  let i = 0;
  let element = from;
  let result = [];

  while (from < to ? element < to : element > to) {
    result[i] = element;
    element += term;
    i++;
  }
  return result;
}
export function arraysAreEqual<T>(arr1: T[], arr2: T[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
