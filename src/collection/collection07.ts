/* 
  Напишите функцию countFrequency, которая принимает массив строк и возвращает Map, где ключи - это элементы массива, а значения - количество их вхождений.
*/

export function countFrequency(arr: string[]): Map<string, number> {
  const map = new Map();
  let word;
  let count;
  
  for (word of arr) {
    if (map.has(word)) {
      count = map.get(word);
      map.set(word, count + 1);
    }
    else {
      map.set(word, 1);
    }
  }

  return map;
}
