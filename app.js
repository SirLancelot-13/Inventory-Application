const express=require('express');
const app=express();
const port=3000;
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded({extended:true}));

const indexController=require('./controllers/indexController.js');
app.use('/',indexController);

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});