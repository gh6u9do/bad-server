import { NextFunction, Request, Response } from 'express';
import { constants } from 'http2';
import BadRequestError from '../errors/bad-request-error';
import sharp from "sharp";

export const uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.file) {
        return next(new BadRequestError('Файл не загружен'))
    }

    try {
        // достаем сам файл
        const file = req.file;

        // проверяем соответсвует ли тип картинке
        if (!file.mimetype.startsWith('image/')) {
            return next(new BadRequestError('Файл должен быть изображением'))
        }

        // задаем минимальный размер
        const MIN_SIZE = 2 * 1024;
        // проверяем минимальный размер
        if (file.size < MIN_SIZE) {
            return next(
                new BadRequestError('Слишком маленький файл')
            )
        }

        // задаем максимальный размер
        const MAX_SIZE = 10 * 1024 * 1024;
        // проверяем максимальный размер
        if (file.size > MAX_SIZE) {
            return next(
                new BadRequestError('Слишком большой файл')
            )
        }

        
        let metadata;
        try {
            // читаем метаданные
            metadata = await sharp(file.path).metadata();
        } catch {
            return next(
                new BadRequestError(
                    'Файл поврежден'
                )
            )
        }

        // если отсутсвует одна ширина или высота выкидываем ошибку
        if (!metadata.width || !metadata.height) {
            return next(new BadRequestError('Некорректное изображение'))
        }

        const fileName = process.env.UPLOAD_PATH
            ? `/${process.env.UPLOAD_PATH}/${req.file.filename}`
            : `/${req.file?.filename}`
        return res.status(constants.HTTP_STATUS_CREATED).send({
            fileName,
            originalName: req.file?.originalname,
        })
    } catch (error) {
        return next(error)
    }
}

export default {}
