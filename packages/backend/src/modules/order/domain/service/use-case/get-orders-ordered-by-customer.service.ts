import {OrderRepositoryInterface} from "@src/modules/order/domain/port/db/order.repository.interface";
import Order from "@src/modules/order/domain/model/entity/order.orm-entity";
import {Exception} from "@src/modules/shared/domain/service/util/exception/exceptions.service";
import {ExceptionTypeEnum} from "@src/modules/shared/domain/const/exception-type.enum";

export default class GetOrdersOrderedByCustomerService {

    readonly MinChar = 5;
    constructor(private readonly ordersRepository: OrderRepositoryInterface) {}

    async getOrdersOrderedByCustomer(customer: string): Promise<Order[]> {
        if (customer.length < this.MinChar) {
            throw new Exception(ExceptionTypeEnum.BadRequest, `Le nombre de caractères du nom du Client "${customer}" est inférieur à ${this.MinChar} caractères`);
        }
        if (customer.match(/\d+/g)) {
            throw new Exception(ExceptionTypeEnum.BadRequest, `Le nom du Client ${customer} contient des chiffres`);
        }

        return await this.ordersRepository.findOrdersOrderedByCustomer(customer);
    }
}