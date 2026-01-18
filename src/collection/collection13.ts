/* 
	Создайте функцию countByRanges, которая принимает массив чисел и массив диапазонов, возвращает Map, где ключи - строковые представления диапазонов, а значения - количество чисел, попадающих в каждый диапазон.
*/

export function countByRanges(numbers: number[], ranges: [number, number][]): Map<string, number> {
	const result = new Map<string, number>();
	
	for (const [start, end] of ranges) {
		const key = `${start}-${end}`;
		result.set(key, 0);
	}

	for (const num of numbers) {
		for (const [start, end] of ranges) {
			if (num >= start && num <= end) {
				const key = `${start}-${end}`;
				const value = result.get(key)!;
				result.set(key, value + 1);
			}
		}
	}
	return result;
}
