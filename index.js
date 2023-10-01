var express = require('express');
var cors = require('cors');
const Tesseract = require('tesseract.js');

var app = express();
app.use(cors())
app.use(express.json());
port = 3001

function scanText(data) {
    const text = Tesseract.recognize(
        data,
        'eng'
    ).then(({ data: { text } }) => {
        // console.log(text)
        return text;
    }).catch(error => {
        throw new Error(error)
    });
    return text
}

app.post('/api/tesseract', async (req, res) => {
    const body = req.body;
    const data = body.data
    var text = await scanText(data)
    text = text.replace('\n', '').trim();
    res.json({ text });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});