import { Request, Response, NextFunction } from "express";
import { findOne } from "../../products/models/products.model";


class ProductValidationMiddleware {
    async productExists(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const productExists = await findOne(req.params.id);
        if (!productExists) {
            return res.status(404).json({ msg: "Prodotto non trovato con ID " + req.params.id + "." });
        }
        next();
    }
}

export default new ProductValidationMiddleware();
