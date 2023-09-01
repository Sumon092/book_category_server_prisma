import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleWares/auth';
import { UserControllers } from './user.controllers';

const router = express.Router();

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UserControllers.updateUser);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserControllers.getAllUser);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserControllers.getSingleUser);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserControllers.deleteUser);

export const UserRoutes = router;
