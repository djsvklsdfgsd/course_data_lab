import type { Db } from "mongodb"

export class User {
    _id: string
    name: string
    email: string
    constructor(_id: string, name: string, email: string) {
        this._id = _id
        this.name = name
        this.email = email
    }
}

export class Order {
    userId: string
    product: string
    amount: number
    constructor(userId: string, product: string, amount: number) {
        this.userId = userId
        this.product = product
        this.amount = amount
    }
}

export interface OrderWithUser {
    _id: any
    userId: string
    product: string
    amount: number
    userInfo: Array<{
        name: string
        email: string
    }>
}

export async function get_orders_with_users(db: Db): Promise<OrderWithUser[]> {
    // TODO: Объединить заказы с информацией о пользователях
    return await db.collection("orders").aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userInfo" 
            }
        },
        {
            $addFields: {
                userInfo: {
                    $map: {
                        input: "$userInfo",
                        as: "user",
                        in: {
                            name: "$$user.name",
                            email: "$$user.email"
                        }
                    }
                }
            }
        }
    ]).toArray() as OrderWithUser[]
}