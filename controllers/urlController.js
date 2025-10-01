const {sequelize,urls}=require('../db');
const {nanoid}=require('nanoid');

//check url is valid or not
const isValidUrl=(url)=>{
    try{
        //built-in validation
        // new URL(url);
        // return true;
        const parsed=new URL(url.trim());
        return parsed.protocol === "http:" || parsed.protocol==="https";
    }catch(_){
        return false;
    }
};

const createShortURL=async(req,res)=>{
    const{original_url}=req.body;
    
  
    //Missing URL
    if(!original_url){
        return res.status(400).json({error:'Original Url is required'});

    }
    //Invalid URL
    if(!isValidUrl(original_url)){
        return res.status(400).json({error:'Invalid url format'});

    }
    
    try{
        
        const shortcode=nanoid(8);

        //Save in database
        const newurl=await urls.create({
            original_url,
            short_code:shortcode,
        });

        

        //json respond
        res.render("urlcode",{
            original_url:newurl.original_url,
            short_code:newurl.short_code,
        });
    }catch(err){
        console.error('Error creating short URL:',err);
        res.status(500).json({error:'Server error'});
    }
};

//for this you have to paste this http://localhost:4000/auth/short_code(which you create) in google
const redirectURL=async(req,res)=>{
    const{shortCode}=req.params;//for passing shortcode with yoururl
    if(!shortCode){
        return res.status(400).json({error:"short_code is required"});
    }
    try{
        const shortcode=await urls.findOne({
            where:{short_code:shortCode}
        });

        if(!shortcode){
            return res.status(404).json({error:"short code not found!"});
        }

        //Redirect to the original URL
        return res.redirect(shortcode.original_url);
    }catch(error){
        res.status(500).json({error:"Short code not found",details:error.message});

    }
};
module.exports={createShortURL,redirectURL};