import mongoose from "mongoose";
import config from "config"


//Logger
import Logger from "../config/logger"

async function connect() {

    const dbUri = config.get<string>("dbUri")

    try {

        await mongoose.connect(dbUri)
        Logger.info("Connected to database!")
        
    } catch (error) {
        Logger.error("Não foi possível conectar!")
        Logger.error(`Erro: ${error}`)
        //para a aplicação caso erro
        process.exit(1)
        
    }
    
}

export default connect