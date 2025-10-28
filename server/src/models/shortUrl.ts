import mongoose from "mongoose";   //let u define schema,validation and interact boss
import { nanoid } from "nanoid";  // generate unique id ,,amaller and safet than uuids

const shortUrlSchema = new mongoose.Schema({
    fullUrl:{
        type:String,
        required: true
    },
    shortUrl:{
        type:String,
        required : true,
        default : () => nanoid().substring(0,10)   // "h1y39xPzT8"
    },
    clicks:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

export const shortUrl = mongoose.model("shortUrl", shortUrlSchema)  //this model now provides us mehtods like shortUrl.create() shortUrl.find() shortUrl.findById()  shortUrl.updateOne() etc...



/*


// POST /shortUrl
const newUrl = await shortUrl.create({ fullUrl: "https://example.com" }); 
const url =   new ShortUrl({fullUrl:"https://fadf"}) url.clicks = 5  await url.save()

// GET /:shortUrl
const urlDoc = await shortUrl.findOne({ shortUrl: req.params.shortUrl });
if (urlDoc) {
  urlDoc.clicks++;
  await urlDoc.save();
  res.redirect(urlDoc.fullUrl);
}


*/
