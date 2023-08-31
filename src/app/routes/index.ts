import express from 'express';
import { UserRoutes } from '../model/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/users',
    routes: UserRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
