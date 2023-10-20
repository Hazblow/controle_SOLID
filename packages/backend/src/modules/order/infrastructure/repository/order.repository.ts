import {DataSource, Repository} from 'typeorm';
import {InjectDataSource} from '@nestjs/typeorm';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import {OrderRepositoryInterface} from "@src/modules/order/domain/port/db/order.repository.interface";

export default class OrderRepository extends Repository<Order> implements OrderRepositoryInterface {
  constructor(
    @InjectDataSource()
    private readonly datasource: DataSource,
  ) {
    super(Order, datasource.createEntityManager());
  }

  async findAllOrders(): Promise<Order[]> {
    const query = this.createQueryBuilder('order');

    return await query.getMany();
  }

  async findOrdersOrderedBeforeACertainDate(certainDate: Date): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    query.where('order.createdAt < :certainDate', { certainDate });

    return await query.getMany();
  }

  async findOrdersOrderedAfterACertainDate(certainDate: Date): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    query.where('order.createdAt > :certainDate', { certainDate });

    return await query.getMany();
  }

  async findOrdersOrderedByCustomer(customer: string): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    query.where('order.customer = :customer', { customer });

    return await query.getMany();
  }

  async findOneById(orderId: string): Promise<Order> {
    const query = this.createQueryBuilder('order');
    query.where('order.id = :orderId', { orderId });

    return await query.getOne();
  }
}
