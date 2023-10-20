import Order from "@src/modules/order/domain/model/entity/order.orm-entity";
import {OrderRepositoryInterface} from "@src/modules/order/domain/port/db/order.repository.interface";

export default class GetOrdersService {
    constructor(private readonly ordersRepository: OrderRepositoryInterface) {}

    async getOrders(): Promise<Order[]> {
        return await this.ordersRepository.findAllOrders();
    }
}