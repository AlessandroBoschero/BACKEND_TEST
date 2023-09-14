// Contiene classe astratta che verrà implementata dalle altre

import { Application } from "express";

export abstract class CommonRoutesConfig {
    app: Application // Fa riferimento alla variabile in app.ts
    name: string // Nome rotta
    apiPrefix: string // Serve per modificare versione API

    constructor(app: Application, name: string, apiPrefix: string) {
        this.app = app;
        this.name = name;
        this.apiPrefix = apiPrefix;

        this.configureRoutes();
    }

    abstract configureRoutes(): Application;

    getName(): string {
        return this.name;
    }
}
