import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import OrderController from '@src/modules/order/presentation/controller/order.controller';
import OrderRepository from "@src/modules/order/infrastructure/repository/order.repository";
import GetOrdersService from "@src/modules/order/domain/service/use-case/get-orders.service";
import {OrderRepositoryInterface} from "@src/modules/order/domain/port/db/order.repository.interface";
import GetOrdersOrderedBeforeACertainDateService
  from "@src/modules/order/domain/service/use-case/get-orders-ordered-before-a-certain-date.service";
import GetOrdersOrderedAfterACertainDateService
  from "@src/modules/order/domain/service/use-case/get-orders-ordered-after-a-certain-date.service";
import GetOrdersOrderedByCustomerService
  from "@src/modules/order/domain/service/use-case/get-orders-ordered-by-customer.service";
import UpdateOrderStatusToPaidService from "@src/modules/order/domain/service/use-case/update-order-status-to-paid.service";
import UpdateOrderStatusToCancelledService
  from "@src/modules/order/domain/service/use-case/update-order-status-to-cancelled.service";
import DeleteOrderService from "@src/modules/order/domain/service/use-case/delete-order.service";
import CreateOrderService from "@src/modules/order/domain/service/use-case/create-order.service";
import {CreateOrderDtoInterface} from "@src/modules/order/domain/model/dto/create-order.dto.interface";
import {CreateOrderDto} from "@src/modules/order/presentation/dto/create-order.dto";

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },

    {
      provide: GetOrdersService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: GetOrdersOrderedBeforeACertainDateService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersOrderedBeforeACertainDateService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: GetOrdersOrderedAfterACertainDateService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersOrderedAfterACertainDateService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: GetOrdersOrderedByCustomerService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersOrderedByCustomerService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: UpdateOrderStatusToPaidService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new UpdateOrderStatusToPaidService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: UpdateOrderStatusToCancelledService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new UpdateOrderStatusToCancelledService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: DeleteOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new DeleteOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: CreateOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CreateOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
  ],
})
export default class OrderModule {}
