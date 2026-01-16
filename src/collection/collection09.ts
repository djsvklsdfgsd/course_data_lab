/* 
	Напишите функцию findIntersection, которая принимает два массива и возвращает массив их общих элементов, используя Set.
*/

export function findIntersection(arr1: number[], arr2: number[]): number[] {
  const intersection = new Set<number>();
  let i;
  let j;

  for (i of arr1) {
    for (j of arr2) {
      if (i===j){
        intersection.add(i);
      }
    }
  }
  return [...intersection];
}
