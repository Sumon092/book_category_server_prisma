import express from 'express';
import { UserControllers } from './user.controllers';

const router = express.Router();

router.get('/', UserControllers.getAllUser);

export const UserRoutes = router;
