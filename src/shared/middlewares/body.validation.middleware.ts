import { Request, Response, NextFunction } from "express";
import { Result, validationResult } from "express-validator";


class BodyValidationMiddleware{
    verifyBodyFieldsError(req: Request, res: Response, next: NextFunction): Response | void{
        const errors: Result<unknown> = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors : errors.array() })
        }
    }
}

export default new BodyValidationMiddleware();
