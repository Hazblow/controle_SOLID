import { RepositoryInterface } from '@src/modules/shared/domain/port/db/repository.interface';
import Order from "@src/modules/order/domain/model/entity/order.orm-entity";

export interface OrderRepositoryInterface extends RepositoryInterface {
    findAllOrders(): Promise<Order[]>;
    findOneById(orderId: string): Promise<Order>;
    findOrdersOrderedBeforeACertainDate(date: Date): Promise<Order[]>;
    findOrdersOrderedAfterACertainDate(date: Date): Promise<Order[]>;
    findOrdersOrderedByCustomer(customer: string): Promise<Order[]>;
}
