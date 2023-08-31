import express from 'express';
import { UserControllers } from './user.controllers';

const router = express.Router();

router.patch('/:id', UserControllers.updateUser);
router.get('/', UserControllers.getAllUser);
router.get('/:id', UserControllers.getSingleUser);
router.delete('/:id', UserControllers.deleteUser);

export const UserRoutes = router;
