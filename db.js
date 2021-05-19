const Pool =require("pg").Pool;
let pool
 //console.log(process.env); 
   // console.log("testing");
    pool = new Pool({
       
        connectionString: "postgres://aefehyowptptaw:a860dc0e6db9bcf629d719bc20d7ce1e25cd697230eabdfd5a741d6bc83d13c3@ec2-50-17-255-120.compute-1.amazonaws.com:5432/d709omf6uc50da",
        ssl: {
            rejectUnauthorized: false
          }
});
module.exports=pool;
//heroku-postgresql:hobby-dev
