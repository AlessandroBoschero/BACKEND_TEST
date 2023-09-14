import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { ProductsRoutes } from "./products/products.routes";
import { CommonRoutesConfig } from "./shared/classes/CommonRoutesConfig";


// Usato per leggere variabili di ambiente in file .env
// Utile per non inserire dati sensibili in codice.
// Mette le variabili disponibili in process.env()
dotenv.config();
const port = process.env.PORT || 3000;


const app = express();


// Contiene le varie rotte. 
// Inizialmente il tipo è never e quando si va ad instanziare la classe
// viene dato errore siccome si aspetta il tipo CommonRoutesConfig.
const routes: CommonRoutesConfig[] = []; 


// Impostazione middlewares
app.use(express.json()); // Indica che il body delle richieste è da interpretare in formato JSON
app.use(express.urlencoded({extended: true})); // Gestire meglio parte parametrica url
app.use(cors()); // Per accettare connessioni da altri clients (X SICUREZZA)
app.use(helmet()); // Per gestire molte richieste e mettere in black list il mittente


routes.push(new ProductsRoutes(app));


app.all("*", (req, res) => res.status(404).json({ msg: "Endpoint non disponibile."}));

// Fare richiesta su PostMan in POST inserendo il body 
// come richiesta raw in formato JSON.
app.listen(port, () => {
    console.log("Il server è in ascolto sulla porta " + port);
});
