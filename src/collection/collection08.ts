/* 
	Создайте функцию unionSets, которая принимает два Set и возвращает новый Set, содержащий все элементы из обоих множеств. 
*/

export function unionSets<T>(set1: Set<T>, set2: Set<T>): Set<T> {
	const res = new Set<T>();
	let i;

	for (i of set1) {
		res.add(i);
	}

	for (i of set2) {
		res.add(i);
	}
	
	return res;
}


