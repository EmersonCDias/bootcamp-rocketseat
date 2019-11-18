import { Router } from 'express';

import AdminController from './app/controllers/AdminController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlansController';

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

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

export default routes;
