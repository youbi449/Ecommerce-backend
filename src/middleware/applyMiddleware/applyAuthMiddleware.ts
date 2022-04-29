import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from '../auth.middleware';
import { resources } from './resources';

export default async function (consumer: MiddlewareConsumer) {
  const applyAuthMiddleware = consumer.apply(AuthMiddleware);
  resources.map(async (resource) => {
    await applyAuthMiddleware.forRoutes(
      {
        path: resource,
        method: RequestMethod.PATCH,
      },
      {
        path: resource,
        method: RequestMethod.DELETE,
      },
    );
  });
  await applyAuthMiddleware.forRoutes({
    path: 'users/profile',
    method: RequestMethod.GET,
  });
}
