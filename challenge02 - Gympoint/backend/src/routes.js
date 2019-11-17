import { Router } from 'express';

import AdminController from './app/controllers/AdminController';
import SessionController from './app/controllers/SessionController';

import authorization from './app/middlewares/auth';

const routes = new Router();

routes.post('/admins', AdminController.store);
routes.post('/sessions', SessionController.store);

routes.use(authorization);

routes.put('/admins', AdminController.update);

export default routes;
