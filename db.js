const Pool =require("pg").Pool;
let pool
 //console.log(process.env); 
   // console.log("testing");
    pool = new Pool({
       
        connectionString: "postgres://loiajvqyeayzsn:7dbb96247113eb90337527925a1487e958e6db77157afec2df9bf323918647da@ec2-18-215-111-67.compute-1.amazonaws.com:5432/dc3n9diq57fl47",
        ssl: {
            rejectUnauthorized: false
          }
});
module.exports=pool;
//heroku-postgresql:hobby-dev
