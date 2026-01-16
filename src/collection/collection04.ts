/* 
	Создайте генераторную функцию filterEven, которая принимает массив чисел и возвращает только четные числа из этого массива, используя yield.
*/

export function* filterEven(arr: number[]): IterableIterator<number> {
	let i;
	for (i of arr){
		if (i % 2 === 0) {
			yield i;
		}
	}
}

