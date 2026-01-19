/* 
	Создайте функцию groupProductsByPrice, которая группирует товары в категории: "дешевые" (<1000), "средние" (1000-5000), "дорогие" (>5000). В функции не должно быть циклов.
*/

type Product = {name: string, price: number};
type GroupedProducts = {cheap: Product[], medium: Product[], expensive: Product[]};

export function groupProductsByPrice(products: Product[]): GroupedProducts {
	const cheap = products.filter(p => p.price < 1000);
	const medium = products.filter(p => p.price >= 1000 && p.price <= 5000);
	const expensive = products.filter(p => p.price > 5000);

	return {cheap, medium, expensive};
}
