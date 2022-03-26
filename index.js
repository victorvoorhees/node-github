const express = require('express');
const https = require('https');

const app = express();

https.get('https://jsonplaceholder.typicode.com/users', res => {
    let data = '';

    res.on('data', chunk => {
        data += chunk;
    })

    res.on('end', () => {
        data = JSON.parse(data);
    
        let dom = '';
        data.forEach(item => {
            dom += `<div style='background: whitesmoke; border-radius: 0.5em; padding: 2.5em'><h2 style='margin: 0 0 0.5em 0;'>${item.name}</h2><p style='margin: 0;'>${item.email}</p></div>`;
        })
        dom = `<div style='display: grid; grid-template-columns: 1fr 1fr 1fr; font-family: Segoe UI; gap: 25px; margin: 0 auto 0 auto; padding-top: 50px; width: fit-content'>${dom}</div>`;

        app.get('/', (req, res) => {
            res.status(200).send(dom);
        })
        
        app.listen(process.env.PORT || 3000, () => console.log('Server started!'));
    })
})