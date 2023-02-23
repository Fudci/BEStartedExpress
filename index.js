const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
var multer = require('multer');
var upload = multer();
app.use(bodyParser.json())

// buat nangkep json raw
// app.use(express.json())

// buat nangkep url encode
// app.use(express.urlencoded())
app.use(upload.array()); 
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello Root!')
})

// query untuk menangkap params dari user
app.get('/hello', (req, res) => {
  console.log({reqHello:req.query})
  res.send('Hello!')
})

app.post('/login', (req, res) => {
  console.log({reqFromOutside:req.body})
  // console.log(req.body);
  const username = req.body.username
  // if(username !== 'Andi'){
  //   res.status(400).send('Login Gagal')
  // }
  res.send('login berhasil!')
})

app.put('/username', (req, res) => {
  console.log({reqData:req.body})
  res.send('update beerhasil!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})