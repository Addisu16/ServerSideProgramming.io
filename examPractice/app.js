const express=require('express');
const fs=require('fs');
const app=express();
const port=8080;
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/signup.html');
});
app.post('/submit', (req, res) => {
    const { firstname, lastname } = req.body;
    if (!firstname || !lastname) {
        const errorMessage = 'First name and last name are required';
        return res.status(400).sendFile(__dirname + '/signup.html', { errorMessage });
    }
    const fullName = `${firstname} ${lastname}`;
    fs.appendFile('database.txt', fullName + ',', 'utf8', (err) => {
        if (err) {
            console.log('Error saving to database.txt:', err);
            return res.status(500).send('Error occurred while saving data.');
        }
        res.redirect('/');
    });
});
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});