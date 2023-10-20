import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import OrderRepository from "@src/modules/order/infrastructure/repository/order.repository";
import Order from "@src/modules/order/domain/model/entity/order.orm-entity";

describe('Get Orders Ordered before a Certain Date', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should return all orders which have a createdAt date < at given date if exist in DB', async () => {
        const getOrderResponse = await request(app.getHttpServer()).get('/api/orders/created-before/3000-10-21');

        expect(getOrderResponse.status).toBe(200);
    });

    it('should not return orders if date have not good format', async () => {
        const getOrderResponse = await request(app.getHttpServer()).get('/api/orders/created-before/testfakedate');

        expect(getOrderResponse.status).toBe(500);
    });

    afterAll(async () => {
        await cleanApp(app, connection);
    });
});