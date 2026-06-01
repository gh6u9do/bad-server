import csurf from "csurf";
import { RequestHandler } from "express";

export const csurfProtection = csurf({
    cookie: {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 3600000,
    }
}) as unknown as RequestHandler;
