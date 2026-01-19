/* 
	Создайте функцию getTopRatedInCategory, которая возвращает 3 товара с наивысшим рейтингом в указанной категории. Функция не должна использовать циклы.
*/

type Product = {category: string, rating: number, name: string}

export function getTopRatedInCategory(products: Product[], category: string): Product[] {
	const categoryProducts = products.filter(p => p.category === category);
	const sorted = categoryProducts.sort((a, b) => b.rating - a.rating);
	
	return sorted.slice(0, 3);
}
