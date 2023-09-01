import { Router } from 'express';
import authRoutes from 'modules/auth/route';
import bookRoutes from 'modules/book/route';
import categoryRoutes from 'modules/category/route';
import userRoutes from 'modules/user/route';

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/users',
        route: userRoutes,
    },
    {
        path: '/categories',
        route: categoryRoutes,
    },
    {
        path: '/books',
        route: bookRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
