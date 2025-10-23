import mongoose from "mongoose";

const connectDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDb connected");
    }catch(err){
        console.error("MongoDb connection failed",err);
        process.exit(1);
    }
}

export default connectDb;