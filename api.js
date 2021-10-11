import express from 'express';
var app = express();

app.get('/', (req, res)=> {
    res.send('Vamos lá');
});

app.listen(3000, () => {
    console.log("Example app listening at port 3000");
});