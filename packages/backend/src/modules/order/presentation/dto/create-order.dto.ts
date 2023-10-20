import {CreateOrderDtoInterface} from "@src/modules/order/domain/model/dto/create-order.dto.interface";
import { IsArray, IsString } from 'class-validator';

export class CreateOrderDto implements CreateOrderDtoInterface {
    @IsString()
    customer: string;

    @IsArray()
    products: string[];
}