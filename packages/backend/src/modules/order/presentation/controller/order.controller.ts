import {Controller, Delete, Get, Param, Patch, Post, Body} from '@nestjs/common';
import GetOrdersService from "@src/modules/order/domain/service/use-case/get-orders.service";
import Order from "@src/modules/order/domain/model/entity/order.orm-entity";
import GetOrdersOrderedAfterACertainDateService
    from "@src/modules/order/domain/service/use-case/get-orders-ordered-after-a-certain-date.service";
import GetOrdersOrderedBeforeACertainDateService
    from "@src/modules/order/domain/service/use-case/get-orders-ordered-before-a-certain-date.service";
import GetOrdersOrderedByCustomerService
    from "@src/modules/order/domain/service/use-case/get-orders-ordered-by-customer.service";
import UpdateOrderStatusToPaidService
    from "@src/modules/order/domain/service/use-case/update-order-status-to-paid.service";
import UpdateOrderStatusToCancelledService
    from "@src/modules/order/domain/service/use-case/update-order-status-to-cancelled.service";
import DeleteOrderService from "@src/modules/order/domain/service/use-case/delete-order.service";
import CreateOrderService from "@src/modules/order/domain/service/use-case/create-order.service";
import {CreateOrderDto} from "@src/modules/order/presentation/dto/create-order.dto";

@Controller('/orders')
export default class OrderController {
    constructor(
        private readonly getOrdersService: GetOrdersService,
        private readonly getOrdersOrderedAfterACertainDateService: GetOrdersOrderedAfterACertainDateService,
        private readonly getOrdersOrderedBeforeACertainDateService: GetOrdersOrderedBeforeACertainDateService,
        private readonly getOrdersOrderedByCustomerService : GetOrdersOrderedByCustomerService,
        private readonly updateOrderStatusToPaidService: UpdateOrderStatusToPaidService,
        private readonly updateOrderStatusToCancelledService: UpdateOrderStatusToCancelledService,
        private readonly deleteOrderService: DeleteOrderService,
        private readonly createOrderService: CreateOrderService,
    ) {}

    @Get()
    async getAllOrders(): Promise<Order[]> {
        return await this.getOrdersService.getOrders();
    }

    @Get('/created-before/:stringDate')
    async getOrdersOrderedBeforeACertainDate(@Param('stringDate') stringDate: string): Promise<Order[]> {
        return await this.getOrdersOrderedBeforeACertainDateService.getOrdersOrderedBeforeACertainDate(stringDate);
    }

    @Get('/created-after/:stringDate')
    async getOrdersOrderedAfterACertainDate(@Param('stringDate') stringDate: string): Promise<Order[]> {

        return await this.getOrdersOrderedAfterACertainDateService.getOrdersOrderedAfterACertainDate(stringDate);
    }

    @Get('/customer/:customer')
    async getOrdersOrderedByCustomer(@Param('customer') customer: string): Promise<Order[]> {
        return await this.getOrdersOrderedByCustomerService.getOrdersOrderedByCustomer(customer);
    }

    @Patch('/:orderId/pay')
    async updateOrderStatusToPaid(@Param('orderId') orderId: string): Promise<Order> {
        return await this.updateOrderStatusToPaidService.updateOrderStatusToPaid(orderId);
    }

    @Patch('/:orderId/cancel')
    async updateOrderStatusToCancelled(@Param('orderId') orderId: string): Promise<Order> {
        return await this.updateOrderStatusToCancelledService.updateOrderStatusToCancelled(orderId);
    }

    @Delete('/delete/:orderId')
    async deleteOrder(@Param('orderId') orderId: string): Promise<void> {
        await this.deleteOrderService.deleteOrder(orderId);
    }

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        await this.createOrderService.createOrder(createOrderDto);
    }
}
