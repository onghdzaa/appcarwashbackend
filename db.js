const Pool =require("pg").Pool;

const pool=new Pool({
    user:"loiajvqyeayzsn",
    password:"7dbb96247113eb90337527925a1487e958e6db77157afec2df9bf323918647da",
    database:"dc3n9diq57fl47",
    host:"ec2-18-215-111-67.compute-1.amazonaws.com",
    port:5432
});
module.exports=pool;
