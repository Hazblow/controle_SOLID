import {OrderRepositoryInterface} from "@src/modules/order/domain/port/db/order.repository.interface";
import Order from "@src/modules/order/domain/model/entity/order.orm-entity";
import {CreateOrderDto} from "@src/modules/order/presentation/dto/create-order.dto";
import {CreateOrderDtoInterface} from "@src/modules/order/domain/model/dto/create-order.dto.interface";

export default class CreateOrderService {
    constructor(
        private readonly ordersRepository: OrderRepositoryInterface,
    ) {
    }

    async createOrder(createOrderDto: CreateOrderDtoInterface): Promise<Order> {

        console.log(createOrderDto)
       const orderToCreate = {
           ...createOrderDto,
            status: 'InCart'
        };

        const orderToSave =  this.ordersRepository.create(orderToCreate) as Order;
        return await this.ordersRepository.save(orderToSave);

    }
}