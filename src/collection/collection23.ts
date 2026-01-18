/* 
	Напишите функцию groupByCategory, которая принимает массив объектов и имя свойства для группировки, возвращает объект, где ключи - значения свойства, а значения - массивы объектов.
*/

export function groupByCategory<T extends Record<string, any>>(arr: T[], key: keyof T): Record<T[keyof T], T[]> {
	const result = {} as any

	for (const item of arr) {
		const value = item[key];

		if (!result[value]) {
			result[value] = [];
		}
		result[value].push(item);
	}
	return result;
}


