import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import { invalidCustomerCaractere, invalidCustomerNumber, orders, validCustomer } from '../utils/order-mock.fixture';
import GetOrdersOrderedByCustomerService
    from "@src/modules/order/domain/service/use-case/get-orders-ordered-by-customer.service";

describe('verifier get orders by customer', () => {
    let orderRepositoryMock: OrderRepositoryInterface;

    beforeAll(() => {
        orderRepositoryMock = {
            findOrdersOrderedByCustomer: () => orders[0],
        } as unknown as OrderRepositoryInterface;
    });

    it('Should return orders for a valid customer name', async () => {

        const getOrdersOrderedByCustomerService = new GetOrdersOrderedByCustomerService(orderRepositoryMock);

        const result = await getOrdersOrderedByCustomerService.getOrdersOrderedByCustomer(validCustomer);

        expect(result).toEqual(orders[0]);
    });

    it('Should throw an exception if the name is 5 or less characters long', async () => {

        const getOrdersOrderedByCustomerService = new GetOrdersOrderedByCustomerService(orderRepositoryMock);

        const result = getOrdersOrderedByCustomerService.getOrdersOrderedByCustomer(invalidCustomerCaractere);

        expect(result).rejects.toThrow(Exception);
    });

    it('Should throw an exception if the name contains numbers', async () => {

        const getOrdersOrderedByCustomerService = new GetOrdersOrderedByCustomerService(orderRepositoryMock);

        const result = getOrdersOrderedByCustomerService.getOrdersOrderedByCustomer(invalidCustomerNumber);

        expect(result).rejects.toThrow(Exception);
    });
});
