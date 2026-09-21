import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js"; 
import {router} from "./routs/userRoutes.js";
import {propertyRouter} from "./routs/propertyRouter.js";
import { bookingRouter } from "./routs/bookingRouter.js";
import { tripRouter } from "./routs/tripRouter.js";


dotenv.config();
const app = express();


//express.json
app.use(express.json({limit: "100mb"}))
//url incoder
app.use(express.urlencoded({limit:"100mb", extended: true}))
//cookie parser
app.use(cookieParser())

app.use(cors({
    origin: process.env.ORIGIN_ACCESS_URL,
    credentials: true,
}))
const PORT = process.env.PORT;
//one test route
app.get("/", (req, res) => {
    res.send("HomelyHub Backend is running");
})

app.use("/api/v1/rent/user", router);
app.use("/api/v1/rent/listing", propertyRouter);
app.use("/api/v1/rent/user/booking",bookingRouter);
app.use("/api/v1/rent/trip", tripRouter);




connectDB(); // Connect to MongoDB
app.listen(PORT, () => {
    console.log(`app is running on port no: ${PORT}`);
})