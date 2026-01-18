/* 	
	Создайте функцию getDiscountedInStockTotal, которая возвращает общую стоимость всех товаров в корзине, которые есть в наличии и имеют скидку.
*/

export type Product = { price: number; discount: boolean; inStock: boolean };

export function getDiscountedInStockTotal(products: Product[]): number {
	let total = 0;

	for (const product of products) {
		if (product.inStock && product.discount) {
			total += product.price;
		}
	}
	return total;
}
