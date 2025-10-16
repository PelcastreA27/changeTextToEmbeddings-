import { AppDataSource } from "./data-source";
import app from "./app";

async function main(){
    try{

        await  AppDataSource.initialize();
        app.listen(3000)
        console.log('Server is listening on port', 3000)
    
    }catch(error){

    }
}

main()