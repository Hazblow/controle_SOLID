import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import OrderRepository from "@src/modules/order/infrastructure/repository/order.repository";
import Order from "@src/modules/order/domain/model/entity/order.orm-entity";

describe('Update order status to pay', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should return 404 if request is not a patch', async () => {
        const getOrderResponse = await request(app.getHttpServer()).get('/api/orders/17f187f2-6e77-4350-8b80-6109ff06d2ae/pay');

        expect(getOrderResponse.status).toBe(404);
    });

    afterAll(async () => {
        await cleanApp(app, connection);
    });
});