const express = require('express');
const Datastore = require('nedb');
const app = express();

app.listen(80,() => console.log('listening at 8080'));
app.use(express.static('client'));
app.use(express.json({ limit : '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) =>
{

    //request
    database.find({}, (err, data) =>
    {
        if(err)
        {
            response.end();
            return;
        }
        response.json(data);
    });
    
});


app.post('/api', (request, response) =>{
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data)
    console.log(data);
    
    response.json({
        status : "success!",
    });
        

})

