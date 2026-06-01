import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

export default function serveStatic(baseDir: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        // Определяем полный путь к запрашиваемому файлу
        const filePath = path.join(baseDir, req.path);

        // абсолютный путь
        const resolvedPath = path.resolve(filePath);
        // абсолютный baseDir
        const resolvedBase = path.resolve(baseDir);

        // если filePath выходит за пределы бызовой папки - вызываем ошибку
        if (!resolvedPath.startsWith(resolvedBase + path.sep)) {
            return res.status(403).send("Доступ запрещен");  
        }

        // Проверяем, существует ли файл
        fs.access(filePath, fs.constants.F_OK, (someError) => {
            if (someError) {
                // Файл не существует отдаем дальше мидлварам
                return next()
            }

            // Файл существует, отправляем его клиенту
            return res.sendFile(filePath, (err) => {
                if (err) {
                    next(err)
                }
            })
        })
    }
}
