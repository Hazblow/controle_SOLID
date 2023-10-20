import {OrderRepositoryInterface} from "@src/modules/order/domain/port/db/order.repository.interface";
import Order from "@src/modules/order/domain/model/entity/order.orm-entity";

export default class GetOrdersOrderedBeforeACertainDateService {
    constructor(private readonly ordersRepository: OrderRepositoryInterface) {}

    async getOrdersOrderedBeforeACertainDate(stringDate: string): Promise<Order[]> {
        const date = new Date(stringDate);
        return await this.ordersRepository.findOrdersOrderedBeforeACertainDate(date);
    }
}