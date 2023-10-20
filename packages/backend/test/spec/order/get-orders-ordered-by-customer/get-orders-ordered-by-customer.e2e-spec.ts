import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get Orders Ordered by a customer', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should return all orders of a giving customer in url if exist in DB', async () => {
        const getOrderResponse = await request(app.getHttpServer()).get('/api/orders/customer/customer-with-a-lot-of-letter');

        expect(getOrderResponse.status).toBe(200);
    });

    it('should not return orders of a not existing customer in url', async () => {
        const getOrderResponse = await request(app.getHttpServer()).get('/api/orders/customer/not-existing-customer');

        expect(getOrderResponse.status).toBe(500);
    });

    afterAll(async () => {
        await cleanApp(app, connection);
    });
});