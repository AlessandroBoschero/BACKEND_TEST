import { Products, Product, SavedProduct } from "./product.interface";
import { v4 as random } from "uuid";
import fs from "fs";
//import { hashPassword } from "../../utils/password";


let products: Products = loadProducts();

function loadProducts(): Products {
    try {
        const data = fs.readFileSync("./products.json", "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        console.log("Errore: " + error);
        return {};
    }
}

function savePoducts() {
    try {
        fs.writeFileSync("./products.json", JSON.stringify(products), "utf-8");
        console.log("Prodotti salvati con successo.");
    }
    catch(error) {
        console.log("Errore: " + error);
    }
}

export const findOne = async (id: string): Promise<SavedProduct> => products[id];

export const findAll = async (): Promise<SavedProduct[]> => Object.values(products);

export const create = async (productData: Product): Promise<SavedProduct> => {
    let id = random();

    // Cerco id univoco
    let checkProduct = await findOne(id);
    while (checkProduct) {
        id = random();
        checkProduct = await findOne(id);
    }

    const newProduct: SavedProduct = {
        id: id,
        code: productData.code,
        description: productData.description,
        um: productData.um,
        price: productData.price
    }
    products[id] = newProduct;
    savePoducts();

    return newProduct;
}

export const update = async (id: string, productData: Product): Promise<SavedProduct | null> => {
    const productExists = await findOne(id);
    if (!productExists) {
        return null;
    }

    products[id] = {
        ...productExists,
        ...productData
    }
    savePoducts();

    return products[id];
}

export const remove = async (id: string): Promise<void | null> => {
    const productExists = await findOne(id);
    if (!productExists) {
        return null;
    }

    delete products[id];
    savePoducts();
}
