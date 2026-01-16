/* 
	Создайте функцию getUnique, которая принимает массив чисел и возвращает новый массив только с уникальными элементами, используя Set.
*/

export function getUnique(arr: number[]): number[] {
	const set = new Set(arr);
	const res = [];
	let value;

	for (value of set) {
		res.push(value);
	}

	return res;
}
