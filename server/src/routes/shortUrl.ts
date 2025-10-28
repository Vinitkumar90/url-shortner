import express from "express";
import { createUrl, deleteUrl, getAllUrl, getUrl } from "../controllers/shortUrl.js";

const router = express.Router();


router.post("/shortUrl",createUrl);
router.get("/getShort",getAllUrl);
router.get("/:id",getUrl);
router.delete("/deleteUrl/:id",deleteUrl);


export default router;