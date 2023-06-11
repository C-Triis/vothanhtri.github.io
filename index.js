//Cài đặt khai báo các thư viện sử dụng
const express = require('express');
const app = express();
const CONFIG =require('./config.js');
const home = require('./routes/home.js')
const product = require('./routes/product.js')
const account = require('./routes/account.js')
const brand = require('./routes/brands.js')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



//app sử dụng 
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use('/', home)
app.use('/product', product)
app.use('/account', account)
app.use('/brand', brand)



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