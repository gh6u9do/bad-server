import { Router } from 'express'
import {
    createOrder,
    deleteOrder,
    getOrderByNumber,
    getOrderCurrentUserByNumber,
    getOrders,
    getOrdersCurrentUser,
    updateOrder,
} from '../controllers/order'
import auth, { roleGuardMiddleware } from '../middlewares/auth'
import { validateOrderBody } from '../middlewares/validations';
import { Role } from '../models/user';

const orderRouter = Router()

orderRouter.post('/', auth, validateOrderBody, createOrder);                                // запрос на создание заказа пользователем
//  добавил проверку админки
orderRouter.get('/all', auth, roleGuardMiddleware(Role.Admin), getOrders);                  // запрос на получение всех заказов
orderRouter.get('/all/me', auth, getOrdersCurrentUser)                                      // запрос на получение заказов конкретного пользователя
orderRouter.get('/:orderNumber', auth, roleGuardMiddleware(Role.Admin), getOrderByNumber);  // запрос на получение номера заказа
orderRouter.get('/me/:orderNumber', auth, getOrderCurrentUserByNumber);                     // запрос на получение пользовательского номера заказа
orderRouter.patch('/:orderNumber', auth, roleGuardMiddleware(Role.Admin), updateOrder);     // запрос на обновление данных заказа по номеру
orderRouter.delete('/:id', auth, roleGuardMiddleware(Role.Admin), deleteOrder);             // запрос на 

export default orderRouter
