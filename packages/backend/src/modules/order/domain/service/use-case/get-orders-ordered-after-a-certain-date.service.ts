import Order from "@src/modules/order/domain/model/entity/order.orm-entity";
import {OrderRepositoryInterface} from "@src/modules/order/domain/port/db/order.repository.interface";

export default class GetOrdersOrderedAfterACertainDateService {
    constructor(private readonly ordersRepository: OrderRepositoryInterface) {}

    async getOrdersOrderedAfterACertainDate(stringDate: string): Promise<Order[]> {
        const date = new Date(stringDate);
        return await this.ordersRepository.findOrdersOrderedAfterACertainDate(date);
    }
}