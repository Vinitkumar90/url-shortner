import express from "express";
import dotenv from "dotenv"
import cors from "cors"
dotenv.config();
import connectDb from "./config/dbConfig.js"
import shortUrl from "./routes/shortUrl.js"

const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials: true,
    })
)

app.use("/api/", shortUrl);


const startServer = async() => {
    try{
        await connectDb();
        app.listen(port, () => {
            console.log("server started successfully at"+port)
        })
    }catch(err){
        console.error("Failed to start server:", err);
        process.exit(1);
    }
}

startServer();