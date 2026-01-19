/* 
	Создайте функцию findMaxWithCondition, которая находит объект с максимальным значением свойства, но только среди элементов, удовлетворяющих условию фильтра, в противном случае возвращает null.
*/

export function findMaxWithCondition<T>(
	array: T[], 
	propertyName: keyof T,
	condition: (item: T) => boolean): T | null {

		let maxProperty = null;

		for (let i = 0; i < array.length; i++) {
			const item = array[i];

			if (condition(item)) {
				if (maxProperty === null) {
					maxProperty = item;
				}
				else if (Number(item[propertyName]) > Number((maxProperty as any) [propertyName])) {
					maxProperty = item;
				}
			}
		}
		return maxProperty;
}


