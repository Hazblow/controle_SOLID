import Order from "@src/modules/order/domain/model/entity/order.orm-entity";
import {OrderRepositoryInterface} from "@src/modules/order/domain/port/db/order.repository.interface";
import {OrderStatusEnum} from "@src/modules/order/domain/model/const/order-status.enum";
import {Exception} from "@src/modules/shared/domain/service/util/exception/exceptions.service";
import {ExceptionTypeEnum} from "@src/modules/shared/domain/const/exception-type.enum";

export default class DeleteOrderService {
    constructor(private readonly ordersRepository: OrderRepositoryInterface) {
    }

    async deleteOrder(orderId: string): Promise<void> {

        //test if orderId is correctUUID format
        const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (!isUUID.test(orderId)) {
            throw new Exception(ExceptionTypeEnum.NotFound,'Invalid orderId');
        }

        const order = await this.ordersRepository.findOneById(orderId);

        if (!order) {
            throw new Exception(ExceptionTypeEnum.NotFound, `Order with id ${orderId} not found`);
        }

        await this.ordersRepository.delete({ id: orderId });

    }
}