import { Request, Response } from "express";
import * as ProductModel from "../models/products.model";
import { SavedProduct } from "../models/product.interface";


export const create = async (req: Request, res: Response) => {
    try {
        const newProduct = await ProductModel.create(req.body);
        return res.status(201).json({newProduct});
    }
    catch( error ) {
        return res.status(500).json({ error: error });
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const updProduct = await ProductModel.update(req.params.id, req.body);
        return res.status(201).json({updProduct});
    }
    catch( error ) {
        return res.status(500).json({ error: error });
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        await ProductModel.remove(req.params.id);
        return res.status(204).json();
    }
    catch( error ) {
        return res.status(500).json({ error: error });
    }
}

export const findAll = async (req: Request, res: Response) => {
    try {
        const allProducts: SavedProduct[] = await ProductModel.findAll();
        return res.status(200).json({totalUsers: allProducts.length, allProducts});
    }
    catch( error ) {
        return res.status(500).json({ error: error });
    }
}

export const findOne = async (req: Request, res: Response) => {
    try {
        const product: SavedProduct = await ProductModel.findOne(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: "Prodotto non trovato." });
        }
        return res.status(200).json({...product});
    }
    catch( error ) {
        return res.status(500).json({ error: error });
    }
}
