/* 	
	Напишите функцию getAffordableInStockProducts, которая фильтрует продукты по цене (дешевле 1000) и наличию на складе, затем возвращает их названия.
*/

type Product = {name: string, price: number, inStock: boolean};

export function getAffordableInStockProducts(products: Product[]): string[] {
	return products.filter(p => p.price < 1000 && p.inStock).map(p => p.name);
}
