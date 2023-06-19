//Cài đặt khai báo các thư viện sử dụng
const express = require('express');
const app = express();
const CONFIG =require('./config.js');
const home = require('./routes/home.js')
const product = require('./routes/product.js')
const account = require('./routes/account.js')
const brand = require('./routes/brands.js')
const promotion = require('./routes/promotion.js')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require("express-session")



//app sử dụng 
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.use(
    session({
      secret: "456456456",
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 * 24 },
      resave: false,
    })
  );
app.use('/admin/product', product)
app.use("/admin/promotion", promotion)
app.use('/account', account)
app.use('/admin/brand', brand)

app.use(function(req, res, next) {
    res.locals.user = req.session.userId;
    next();
});

  app.use('/', home)

//Kiểm tra mongoodb được kết nối chưa
mongoose 
    .connect(CONFIG.MONGODB_URL, {
        maxPoolSize: 20,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected MongoDB');
    })
    .catch((err) => {
        console.log(`Connected mongodb fail: ${err}`);
    })

//Port 3000 vs MongoDB 
app.listen(CONFIG.PORT, () => {
    console.log(`Example app listening on port ${CONFIG.PORT}`)
})