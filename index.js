const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser");
const port=process.env.port || 8080
// const { json } = require("body-parser");
// const { response } = require("express");
// const { Connection } = require("pg");

app.use(express.json({limit: '50mb'}));
const corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
//var sess;
// fierbase
// var firebaseConfig = {
//   apiKey: "AIzaSyBdJa3OMeaLfZvL7U_KJIAoFdd8vQBGioA",
//   authDomain: "notitest-b218e.firebaseapp.com",
//   projectId: "notitest-b218e",
//   storageBucket: "notitest-b218e.appspot.com",
//   messagingSenderId: "611972565428",
//   appId: "1:611972565428:web:6cb7b477c1251666678ae1"
// };
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
//postlogin
app.get("/",async(req,res)=>{
  res.json({result:"ok",data:[1,2,3,4,5]})
})
app.post("/logins", async (req, res) => {
  const user = req.body.username;
  console.log(req.body.username);
  const pass = req.body.password;
  console.log(req.body.password);
  //res.send({ result: "successful", error: "songsakdi" });
  try {
    const Login = await pool
      .query("SELECT * FROM login WHERE user_id = $1 AND password = $2", [
        user,
        pass,
      ])
      .then((response) => {
        console.log("testcase" + response.rowCount);
        if (response.rowCount === 1) {
          console.log();
          console.log("case1");
          res.send({ result: "successful", type: response.rows[0].type_admin });
        } else {
          res.send({ result: "error" });
        }
      });
  } catch (err) {
    console.error(err.message);
  }
});
//postlogin rider
app.post("/loginstaff", async (req, res) => {
  const user = req.body.username;
  console.log(req.body.username);
  const pass = req.body.password;
  console.log(req.body.password);
  //res.send({ result: "successful", error: "songsakdi" });
  try {
    const Login = await pool
      .query("SELECT * FROM staff WHERE username = $1 AND password = $2", [
        user,
        pass,
      ])
      .then((response) => {
        console.log("testcase" + response.rowCount);
        if (response.rowCount === 1) {
         // console.log(response.rows)
          res.send({ result: "successful", id: response.rows[0].id_staff });
        } else {
          res.send({ result: "error" });
        }
      });
  } catch (err) {
    console.error(err.message);
  }
});
//post register
app.post("/registers", async (req, res) => {
  //req.body.ise;
  console.log(req.body);
  try {
    const user = req.body.username;
    const pass = req.body.password;
    //console.log(req.body.tel);
    const Register = await pool.query(
      "INSERT INTO login (user_id,password,name,tel,email,address,model,numcar,img) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [
        req.body.username,
        req.body.password,
        req.body.name,
        req.body.tel,
        req.body.email,
        req.body.address,
        req.body.model,
        req.body.numcar,
        req.body.img
      ]
    );
    res.send({ result: "successful" });
  } catch (err) {
    console.log("sss");
    console.error(err.message);
  }
});
//get staff
app.get("/staff", async (req, res) => {
  try {
    const allLogin = await pool.query("SELECT * FROM staff");
    console.log(allLogin.rows[0].id_staff);
    //console.log(allLogin.rows.sort(function(a,b){return a.id_staff-b.id_staff}))
    res.json(allLogin.rows.sort(function(a,b){return a.id_staff-b.id_staff}));
  } catch (err) {
    console.log("sss");
    console.error(err.message);
  }
});
//get datalogin
app.post("/logindata", async (req, res) => {
  const user = req.body.username;
  const pass = req.body.password;
  try {
    const allLogin = await pool.query(
      "SELECT * FROM login WHERE user_id = $1 AND password = $2",
      [user, pass]
    );

    res.json(allLogin.rows);

    //console.log(response.rows[0].name)
  } catch (err) {
    console.log("sss");
    console.error(err.message);
  }
});
//post profile
app.post("/profile", async (req, res) => {
  try {
    const allLogin = await pool.query("SELECT * FROM login WHERE numid=$1", [
      req.body.fullname,
    ]);
    console.log(req.body);
    console.log("allLogin.rows");
    console.log(allLogin.rowCount);
    res.json(allLogin.rows);

    //console.log(response.rows[0].name)
  } catch (err) {
    
    // console.error(err.message);
  }
});
//post booking
app.post("/booking", async (req, res) => {
  // req.body.ise;
  //\ console.log("("+req.body.gps.lat+","+req.body.gps.lng+")");
  console.log(req.body.id_member);
  const gpsss = "(" + req.body.gps.lat + "," + req.body.gps.lng + ")";
  // console.log(gpsss+"sss")
  const lat = "POINT(req.body.gps.lat,req.body.gps.lng)";
  const lng = "POINT(req.body.gps.lat,req.body.gps.lng)";
  console.log(req.body.price+"asdasddas");
  try {
    const Register = await pool.query(
      "INSERT INTO reserve (name_member,name_staff,tel_member,tel_staff,id_staff,time,gps,type,model,numcar,price,date,status,id_member,address,img,working_member) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING id",
      [
        req.body.name_member,
        req.body.name_staff,
        req.body.tel_member,
        req.body.tel_staff,
        req.body.id_staff,
        req.body.time,
        [gpsss],
        req.body.type,
        req.body.model,
        req.body.numcar,
        req.body.price,
        req.body.date,
        req.body.status,
        req.body.id_member,
        req.body.address,
        req.body.img,
        1
      ]
    );
    res.send({ result: "successful",
               id:Register.rows[0].id});
    console.log(req.body.price)
    //console.log(Register)
  } catch (err) {
    console.log("sss");
    console.error(err.message);
  }
});
//test get
app.get("/bookinghistory/apix/apix/:id", async (req, ress) => {
  try {
    var allLogin = await pool.query(
      "SELECT * FROM reserve WHERE id_member=$1",
      [req.params.id]
    );
    ress.json(allLogin.rows.sort(function(a,b){return b.id-a.id}))
   //console.log(allLogin.rows.id)
   // ress.json(allLogin.rows.sort(function(a,b){return b.id-a.id}));
    //ress.json(allLogin.rows)
  } catch (err) {
    console.error(err.message);
  }
});
//get listhistory
// the sub app
// app.get("/bookinghistory/search", async (req, res) => {
//   try {
//     // console.log(req.query.id);
//     var allLogin = await pool.query(
//       "SELECT * FROM reserve WHERE id_member=$1",
//       [req.query.id]
//     );
//     app.get("/bookinghistory/api", async (req, ress) => {
//       try {
//         //console.log(allLogin.rows.sort(function(a,b){return b.id-a.id}))
//      //   console.log(allLogin.rows.id)
//         ress.json(allLogin.rows.sort(function(a,b){return b.id-a.id}));
//         //ress.json(allLogin.rows)
//       } catch (err) {
//         console.error(err.message);
//       }
//     });
//     //console.log(req);
//     console.log(allLogin.rows);
//     //console.log(allLogin.rowCount);
//    res.json(allLogin.rows);
//   } catch (err) {
//     //console.log("sss");
//     console.error(err.message);
//   }
// });
//get list customer
app.get("/listcustomer", async (req, res) => {
  try {
    const allLogin = await pool.query(
      "SELECT * FROM login WHERE type_admin IS NULL"
    );
   // console.log(allLogin.rows);
    res.json(allLogin.rows.sort(function(a,b){return a.numid-b.numid}));
  } catch (err) {
    console.error(err.message);
  }
});
//get calender
app.get("/calender", async (req, res) => {
  try {
    const allLogin = await pool.query("SELECT * FROM reserve ");
   // console.log(allLogin.rows);
    res.json(allLogin.rows.sort(function(a,b){return b.id-a.id}));
  } catch (err) {
    console.error(err.message);
  }
});
//get listprice
app.get("/listprice", async (req, res) => {
  try {
    const allLogin = await pool.query("SELECT * FROM munuprice");
    //console.log(allLogin.rows);
    res.json(allLogin.rows.sort(function(a,b){return a.price-b.price}));
  } catch (err) {
    console.error(err.message);
  }
});
//put profile
app.put("/editprofile", async (req, res) => {
  try {
    const allLogin = await pool.query(
      "UPDATE login SET name = $1, tel = $2 ,email = $3,address = $4,model = $5,numcar =  $6, img= $7 WHERE numid=$8",
      [req.body.name, req.body.tel, req.body.email,req.body.address,req.body.model,req.body.numcar,req.body.img,req.body.id]
    );
    console.log(req.body);
    // res.json(allLogin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//put price
app.put("/editprice", async (req, res) => {
  try {
    const allLogin = await pool.query(
      "UPDATE munuprice SET price = $1 ,process=$2,img= $3 WHERE id=$4",
      [ req.body.price_price, req.body.price_waytobuy,req.body.price_img,req.body.index]
    );
    console.log(req.body);
    // res.json(allLogin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//put employee
app.put("/editemployee", async (req, res) => {
  try {
    const allLogin = await pool.query(
      "UPDATE staff SET Full_Name = $1, Tell_Staff = $2  WHERE Id_Staff=$3",
      [req.body.name,req.body.tel,req.body.id]
    );
    console.log(allLogin.rowCount);
    if(allLogin.rowCount==0){
      console.log(req.body.name);

      const Register = await pool.query(
        "INSERT INTO staff (full_name,tell_staff)  VALUES ($1,$2) ",
        [
          req.body.name,req.body.tel
        ]
      );
    }
     //res.json(allLogin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//price bookingconfirm
app.post("/munuprice", async (req, res) => {
  try {
    const allLogin = await pool.query(
      "SELECT * FROM munuprice WHERE type=$1",
      [req.body.p]
    );
    console.log(allLogin.rows[0].price)
   // res.send({ result: req.body });
     res.json(allLogin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//ตารางงาน rider
app.get("/listrider", async (req, res) => {
  try {
     const allLogin = await pool.query("SELECT * FROM reserve WHERE status=$1 AND id_staff = $2 ",[req.query.status,req.query.id]);
     console.log(allLogin.rowCount);
     if(allLogin.rowCount>0){
        res.json(allLogin.rows);
     }
    console.log(req.query.id);
 //  console.log(allLogin.rows)
   
  } catch (err) {
    console.error(err.message);
  }
});
// profile rider
app.get("/profilerider", async (req, res) => {
  try {
   console.log(req)
   const allLogin = await pool.query("SELECT * FROM staff WHERE id_staff=$1 ",[req.query.id]);

   res.json(allLogin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//status change begin
app.put("/statuschangebegin", async (req, res) => {
  try {
    const allLogin = await pool.query(
      "UPDATE reserve SET status = $1 ,working = $2 WHERE id=$3",
      [req.body.status,req.body.working,req.body.id]
    );
 //   console.log(req.body);
     //res.json(allLogin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//status change
app.put("/statuschange", async (req, res) => {
  try {
    const allLogin = await pool.query(
      "UPDATE reserve SET status = $1 WHERE id=$2",
      [req.body.status,req.body.id]
    );
  //  console.log(req);
     //res.json(allLogin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//showstatus change
app.get("/showinformation", async (req, res) => {
  try {
    const allLogin = await pool.query(
      "SELECT * FROM reserve WHERE id_staff=$1 AND working=1",
      [req.query.id]
    );
    //console.log(allLogin.rows);
     res.json(allLogin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//showstatus change 5
app.get("/showinformation5", async (req, res) => {
  try {
    const allLogin = await pool.query(
      "SELECT * FROM reserve WHERE id=$1",
      [req.query.id]
    );
    //console.log(allLogin.rows);
     res.json(allLogin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//gps
app.get("/gps", async (req, res) => {
  try {
   console.log(req.query.id)
   const allLogin = await pool.query("SELECT * FROM reserve WHERE id=$1 ",[req.query.id]);
//console.log(allLogin.rows[0].gps)
   res.json(allLogin.rows[0].gps);
  } catch (err) {
    console.error(err.message);
  }
});
//status change3
app.put("/statuschange3", async (req, res) => {
  try {
    const allLogin = await pool.query(
      "UPDATE reserve SET status = $1 , imgcar = $2  WHERE id=$3",
      [req.body.status,req.body.imgcar,req.body.id]
    );
   // console.log(req.body);
     //res.json(allLogin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//status change4
app.put("/statuschange4", async (req, res) => {
  try {
    const allLogin = await pool.query(
      "UPDATE reserve SET status = $1 , imgpay = $2, typepay=$3  WHERE id=$4",
      [req.body.status,req.body.imgpay,req.body.typepay,req.body.id]
    );
  // console.log(req.body);
     //res.json(allLogin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//status change5
app.put("/statuschange5", async (req, res) => {
  try {
    const allLogin = await pool.query(
      "UPDATE reserve SET   working=0  WHERE id=$1",
      [req.body.id]
    );
    //console.log(req.body);
     //res.json(allLogin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//get งานค้าง
app.get("/riderstop", async (req, res) => {
  try {
   const allLogin = await pool.query("SELECT * FROM reserve WHERE id_staff=$1 AND working=1",[req.query.id]);
console.log(allLogin.rowCount)
if(allLogin.rowCount>0){
  res.json(allLogin.rows);
}else{
  res.send({ result: "error" })
}
   
  } catch (err) {
    console.error(err.message);
  }
});
//get reserve
app.get("/customerpresent", async (req, res) => {
  try {
   const allLogin = await pool.query("SELECT * FROM reserve WHERE id_member=$1 AND working_member=1",[req.query.id]);
//console.log(allLogin.rowCount)
// if(allLogin.rowCount>0){
 res.json(allLogin.rows);
// }else{
//   res.send({ result: "error" })
// }
   
  } catch (err) {
    console.error(err.message);
  }
});
//get งานค้าง custommer
app.get("/customerstop", async (req, res) => {
  try {
   const allLogin = await pool.query("SELECT * FROM reserve WHERE id_member=$1 AND working_member=1",[req.query.id]);

console.log(allLogin.rowCount)
if(allLogin.rowCount>0){
  res.json(allLogin.rows);
}else{
  res.send({ result: "error" })
}
   
  } catch (err) {
    console.error(err.message);
  }
});
//gettoday calender
app.get("/calender/today", async (req, res) => {
  try {
    const allLogin = await pool.query("SELECT * FROM reserve WHERE DATE(date) = DATE(NOW()) AND(status='ชำระเงินเสร็จสิ้น' OR status='เสร็จสิ้น') ");
  //  console.log(allLogin.rowCount);
 //  console.log(allLogin.rows);
    res.json(allLogin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//gettoday calender
app.get("/calender/today/sum", async (req, res) => {
  try {
    const allLogin = await pool.query("SELECT SUM (price) FROM reserve WHERE DATE(date) = DATE(NOW()) AND(status='ชำระเงินเสร็จสิ้น' OR status='เสร็จสิ้น')");
   // console.log(allLogin.rowCount);
   // console.log(allLogin.rows);
   res.json(allLogin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// หยุดการทำงาน ลูกค้า
app.put("/stop", async (req, res) => {
  try {
    //console.log(req.body.id);
    const allLogin = await pool.query(
      "UPDATE reserve SET working_member = 0 , status='เสร็จสิ้น' WHERE id=$1",
      [req.body.id]
    );
    console.log("sdasdsda");
    // res.json(allLogin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//คำนวณ
app.put("/calculate", async (req, res) => {
  try {
    const allLogin = await pool.query(
      "UPDATE staff SET count1 = count1 + 1, total = total+$1  WHERE id_staff=$2",
      [req.body.value,req.body.id]
    );
    console.log(req.body);
     //res.json(allLogin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.put("/calculate/average", async (req, res) => {
  try {
    const allLogin = await pool.query(
      "UPDATE staff SET average=total/count1 WHERE id_staff=$1",
      [req.body.id]
    );
    console.log("average");
     //res.json(allLogin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//put time
app.put("/time", async (req, res) => {
  try {
    var time=''
    if(req.body.time=="time1"){
      time="UPDATE staff SET time1 = 1  WHERE id_staff=$1";
    }else if(req.body.time=="time2"){
      time="UPDATE staff SET time2 = 1  WHERE id_staff=$1";
    }else if(req.body.time=="time3"){
      time="UPDATE staff SET time3 = 1  WHERE id_staff=$1";
    }else if(req.body.time=="time4"){
      time="UPDATE staff SET time4 = 1  WHERE id_staff=$1";
    }else if(req.body.time=="time5"){
      time="UPDATE staff SET time5 = 1  WHERE id_staff=$1";
    }else if(req.body.time=="time6"){
      time="UPDATE staff SET time6 = 1  WHERE id_staff=$1";
    }else if(req.body.time=="time7"){
      time="UPDATE staff SET time7 = 1  WHERE id_staff=$1";
    }else if(req.body.time=="time8"){
      time="UPDATE staff SET time8 = 1  WHERE id_staff=$1";
    }else if(req.body.time=="time9"){
      time="UPDATE staff SET time9 = 1  WHERE id_staff=$1";
    }
    console.log(time);
    const allLogin = await pool.query(
      time,
      [req.body.id]
    );
    console.log(req.body);
     //res.json(allLogin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.listen(port, () => {
  
  console.log(port);
});
module.exports = {
  presets: [
    '@vue/app'
  ]
}
