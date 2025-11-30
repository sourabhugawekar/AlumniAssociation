import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

// const fs = require('fs');
// const cloudinary = require('cloudinary').v2;





// cloudinary.config({
//     cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_API_SECRET,

// });

cloudinary.config({
    cloud_name:'dbh5fbyv4',
    api_key:'965421342544566',
    api_secret:'iiKX5xXh4o6EJ0shxHbKSsuh4kc',

});



export const uploadOnCloudinary = async  (localFilePath,folderPath) => {
    try{
        if(!localFilePath) return null;
        
        const res = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto",
            folder:folderPath,
        })
        
        console.log(res);
        // const url = res.secure_url;
        // console.log(url);
        fs.unlinkSync(localFilePath);
        return res;
        
    }
    catch(err){
        fs.unlinkSync(localFilePath);
        console.log(err);
        return null;
    }
};
