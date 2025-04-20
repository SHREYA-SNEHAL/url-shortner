const  express=require('express');
const router=express.Router();
const{createShortURL,redirectURL}=require('../controllers/urlController');

router.get("/shorturl",(req,res)=>{
    res.render("shorturl");
})
router.post('/shorturl',createShortURL);
router.get('/:shortCode',redirectURL);

module.exports=router;