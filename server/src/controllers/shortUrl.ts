import express from "express";
import { shortUrl } from "../models/shortUrl.js";

export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const fullUrl = req.body.fullUrl;
    console.log(fullUrl);
    const findUrl = await shortUrl.findOne({ fullUrl });
    if (findUrl) {
      res.status(409).send(findUrl); //confilct we have it already in db broo
    } else {
      const newShortUrl = await shortUrl.create({ fullUrl });
      res.status(201).send(newShortUrl);
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const getAllUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const findAll = await shortUrl.find({});
    if (findAll.length < 0) {
      res.status(404).send({ message: "Short Urls not found!" });
    } else {
      res.status(200).send(findAll);
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

//  /:id   /12345

export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrlFind = await shortUrl.findOne({ shortUrl: req.params.id });

    if (!shortUrlFind) {
      res.status(404).send({ message: "Full url not found!" });
    }
    else{
        shortUrlFind.clicks++;
        await shortUrlFind.save();

        return res.redirect(shortUrlFind.fullUrl);
    }
  } catch (error) {
    console.error("Error redirecting: ",error);
    res.status(500).json({message:"Internal server error"});
  }
};

export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deleteUrl = await shortUrl.findByIdAndDelete({_id:req.params.id});
    console.log(deleteUrl)
    if(deleteUrl){
        res.status(200).send({message:"Request Url successfully deleted"})
    }
  } catch (error) {
    res.status(500).send({message:"Something went wrong!"})
  }
};
