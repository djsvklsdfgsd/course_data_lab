/* 
	Напишите функцию getOrderStats, которая принимает массив заказов и возвращает объект с общей суммой, количеством и средним чеком только завершенных заказов (status: 'completed').
*/

type Order = {status: string, amount: number}
type Stats = {total: number, count: number, average: number}

export function getOrderStats(orders: Order[]): Stats{
	let total = 0;
	let count = 0;

	for (let i = 0; i <orders.length; i++) {
		const order = orders[i]

		if (order.status === 'completed') {
			total += order.amount;
			count++;
		}
	}
	
	let average = 0;
    if (count > 0) {
        average = total / count;
    }

	return { total, count, average };
}
