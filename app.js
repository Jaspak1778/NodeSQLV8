const path = require('path')
const express = require('express');
const sql = require("msnodesqlv8");

const app = express();
const PORT = process.env.PORT || 3000;
const connectionString = "server=ASUSDT;Database=Calendar;Trusted_Connection=Yes;Driver={SQL Server}";
const query = "SELECT * FROM dbo.Events";

//lähettää tiedot localhost:3000/events osoitteeseen, josta ne voidaan hakea webclient puolelta fetch komennolla ja lisäämällä osoite 
app.get('/events', (req, res) => {
    sql.query(connectionString, query, (err, rows) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            res.json(rows);
        }
    });
});

app.get('/test', function(req, res){
    res.send('test');
});

const polku = path.join(__dirname, './public')
app.use(express.static(polku))


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


    