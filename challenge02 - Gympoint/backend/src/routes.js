import { Router } from 'express';

import AdminController from './app/controllers/AdminController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authorization from './app/middlewares/auth';

const routes = new Router();

routes.post('/admins', AdminController.store);
routes.post('/sessions', SessionController.store);

routes.use(authorization);

routes.put('/admins', AdminController.update);
routes.get('/admins', AdminController.index);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

export default routes;
