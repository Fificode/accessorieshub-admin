import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () : Promise<void> => {
    mongoose.set("strictQuery", true)
    
    if(isConnected){
        console.log("Mongo DB is already connected");
        return;
    }
    const mongoUri = process.env.MONGODB_URL;
    
    if (!mongoUri) {
        console.error("MONGODB_URL environment variable is not set.");
        throw new Error("MONGODB_URL environment variable is not set.");
    }
    
    try {
        console.log("Connecting to MongoDB with URI:", mongoUri);
await mongoose.connect(process.env.MONGODB_URL || "", {
    dbName: "AcessoriesHub_Admin"
})
isConnected = true;
console.log("MongoDB is connected");
    }
    catch(err){
        console.log("Error connecting to MongoDB",err);
        throw err;
    }
}