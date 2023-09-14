import { Application } from "express";
import { CommonRoutesConfig } from "../shared/classes/CommonRoutesConfig";
import * as Products from "./controllers/products.controller";
import { body } from "express-validator";
import ProductValidationMiddleware from "../shared/middlewares/product.validation.middleware";
import BodyValidationMiddleware from "../shared/middlewares/body.validation.middleware";


export class ProductsRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, "ProductsRoutes", "/v1/products");
    }

    configureRoutes(): Application {
        this.app.route("/v1/products/:id")
            .get(
                ProductValidationMiddleware.productExists,
                Products.findOne
            )
            .put(
                ProductValidationMiddleware.productExists,
                body('code').isString()
                    .withMessage("Il campo code è obbligatorio e deve essere una stringa."),
                body('description').isString().optional({ nullable: true })
                    .withMessage("Il campo description è obbligatorio e deve essere una stringa."),
                body('um').default('nr').isString().isLength({ min: 2, max: 2 }).optional({ nullable: true })
                    .withMessage("Il campo um è obbligatorio e deve avere una lunghezza di 2 caratteri."),
                body('price').default(0).isNumeric().optional({ nullable: true })
                    .withMessage("Il campo price è obbligatorio e deve essere numerico."),
                Products.update
            )
            .delete(
                ProductValidationMiddleware.productExists,
                body('code').isString().withMessage("Il campo code è obbligatorio e deve essere una stringa."),
                Products.remove
            );

        this.app.route("/v1/products")
            .post(
                body('code').isString()
                    .withMessage("Il campo code è obbligatorio e deve essere una stringa."),
                body('description').isString()
                    .withMessage("Il campo description è obbligatorio e deve essere una stringa."),
                body('um').default('nr').isString().isLength({ min: 2, max: 2 })
                    .withMessage("Il campo um è obbligatorio e deve avere una lunghezza di 2 caratteri."),
                body('price').default(0).isNumeric()
                    .withMessage("Il campo price è obbligatorio e deve essere numerico."),
                BodyValidationMiddleware.verifyBodyFieldsError,
                Products.create
            )
            .get(Products.findAll);
        return this.app;
    }
}
