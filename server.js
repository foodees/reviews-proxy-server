const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());
app.use('/biz/:business_id', express.static(path.join(__dirname, 'public')));

app.use('/reviews/', (req, res) => {
  let url = `http://localhost:3004/biz/:business_id/reviews${req.url}`;
  req.pipe(request(url)).pipe(res);
});


// app.get('biz/:id', (req, res) => {
//   console.log(req.url)
//   if (req.url === '/app.js') {
//     res.sendFile(path.join(__dirname, 'public'))
//   }
// });


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
