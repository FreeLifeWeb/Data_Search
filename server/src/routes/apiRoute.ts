import express, { Request, Response, Router } from 'express';
import fs from 'fs-extra';
import { body, validationResult } from 'express-validator';

const dataRouter = Router();
const fileName = './userData.json';

interface UserData {
    email: string;
    number: string;
}

interface UserDataArray extends Array<UserData> {}

let previousRequestTimeout: NodeJS.Timeout | null = null;

dataRouter.post(
    '/data',
    [
        body('email').isEmail().withMessage('Некорректный email'),
        body('number').isNumeric().withMessage('Некорректный номер').optional(),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        try {
            const { email, number } = req.body as {
                email: string;
                number: string;
            };

            // Отменяем предыдущий запрос, если он есть
            if (previousRequestTimeout) {
                clearTimeout(previousRequestTimeout);
            }

            // Добавляем задержку в 5 секунд
            previousRequestTimeout = setTimeout(() => {
                const jsonData: string = fs.readFileSync(fileName, 'utf-8');
                const data: UserDataArray = JSON.parse(jsonData);

                // Фильтруем данные
                const filteredData = data.filter((user: UserData) => {
                    if (email && number) {
                        return user.email === email && user.number === number;
                    } else if (email) {
                        return user.email === email;
                    } else if (number) {
                        return user.number === number;
                    }
                    return false;
                });

                if (filteredData.length === 0) {
                    res.json({
                        message: 'Нет записей, удовлетворяющих вашему запросу.',
                    });
                } else {
                    res.json(filteredData);
                }
            }, 5000);
        } catch (error) {
            console.error('Ошибка при чтении файла:', error);
            res.status(500).json({ error: 'Ошибка на сервере' });
        }
    }
);

export default dataRouter;
