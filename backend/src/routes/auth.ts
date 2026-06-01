import { Router } from 'express'
import {
    getCurrentUser,
    getCurrentUserRoles,
    login,
    logout,
    refreshAccessToken,
    register,
    updateCurrentUser,
} from '../controllers/auth'
import auth from '../middlewares/auth'
import { csurfProtection } from '../middlewares/csurf'

const authRouter = Router()

authRouter.post('/login', login);
authRouter.get('/token', refreshAccessToken);
authRouter.get('/logout', logout);
authRouter.post('/register', register);

authRouter.get('/user', auth, csurfProtection, getCurrentUser);
authRouter.patch('/me', auth, csurfProtection, updateCurrentUser);
authRouter.get('/user/roles', auth, csurfProtection, getCurrentUserRoles);

// routes/auth.ts
authRouter.get('/csrf-token', csurfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

export default authRouter
