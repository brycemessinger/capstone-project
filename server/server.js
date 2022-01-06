const express = require('express')
const path = require('path')
const app = express()
const ctrl = require('./controller.js')
app.use(express.json())

app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname, '../index.html'));
  });

  app.get('/api/scores', ctrl.getScore)
  app.post('/api/scores', ctrl.postScore)


app.listen(4050, () => console.log('Server is running on port 4050'))


