export function range(n1: number, n2?: number, term = 1) {
  const [from, to] = typeof n2 === 'number' ? [n1, n2] : [0, n1];
  let i = 0;
  let element = from;
  const result = [];

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

export const moveToFirst = (arr: any[], value: number) =>
  [value].concat(arr.filter((ele) => ele !== value));

export const moveToLast = (arr: any[], value: number) =>
  arr.filter((ele) => ele !== value).concat([value]);

export const sliceThenConcat = (arr: any[], value: any): any[] => {
  const index = arr.indexOf(value);

  if (index === -1) {
    return arr;
  }

  const sliced1 = arr.slice(0, index);
  const sliced2 = arr.slice(index + 1);

  return [...sliced2, ...sliced1, value];
};

export const moveFirstToLast = (arr: any[]) => {
  return [arr.at(-1)].concat(arr.slice(0, -1))
};

export const moveLastToFirst = (arr: any[]) => {
  const newArr = arr.slice(1)
  newArr.push(arr[0])

  return newArr;
};