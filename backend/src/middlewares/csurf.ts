import csurf from "csurf";


export const csurfProtection = csurf({
    cookie: {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 3600000,
    }
})
