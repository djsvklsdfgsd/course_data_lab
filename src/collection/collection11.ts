/* 
	Создайте функцию groupBy, которая принимает массив объектов и ключ, возвращает Map, где ключи - значения этого свойства, а значения - массивы объектов с таким значением свойства.
*/

export function groupBy<T extends Record<string, any>>(arr: T[], key: keyof T): Map<T[keyof T], T[]> {
	const map = new Map<T[keyof T], T[]>();

	for (let i = 0; i < arr.length; i++) {
		const obj = arr[i];
		const value = obj[key];

		if (map.has(value)) {
			map.get(value)!.push(obj);
		}
		else {
			map.set(value, [obj]);
		}
	}
	return map;
}
