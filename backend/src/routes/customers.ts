import { Router } from 'express'
import {
    deleteCustomer,
    getCustomerById,
    getCustomers,
    updateCustomer,
} from '../controllers/customers';
import auth, { roleGuardMiddleware } from '../middlewares/auth';
import { Role } from '../models/user';

const customerRouter = Router()


customerRouter.get('/', auth, roleGuardMiddleware(Role.Admin), getCustomers)             // все пользователи
customerRouter.get('/:id', auth, roleGuardMiddleware(Role.Admin), getCustomerById)       // конкретный юзер по id
customerRouter.patch('/:id', auth, roleGuardMiddleware(Role.Admin), updateCustomer)      // обновление данных конкретногг юзера
customerRouter.delete('/:id', auth, roleGuardMiddleware(Role.Admin), deleteCustomer)     // удаление конкретного юзера

export default customerRouter
