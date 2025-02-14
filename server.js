const express = require('express');
const sql = require('mssql');
const app = express();

const config = {
    user: 'sa',
    password: 'azureadmin',           // Your password here
    server: '20.203.16.20',           // IP address only
    port: 3014,                       // Port added separately
    database: 'Focus8190',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/generate', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('sVoucherNo', sql.VarChar(50), req.body.voucherNo)
            .execute('dbo.PackingListReport');
            
        res.render('report', { data: result.recordset });
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send(err.message);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(Server running at http://localhost:${PORT});
});
