const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const https = require('https');

require('dotenv').config();

const app = express();



let a = '';
let b = '';

/* DATABASE */

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: true
        }
    }
});

sequelize.authenticate().then(() => console.log('Connected to database')).catch(error => console.error(error));

const Moron = sequelize.define('morons', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

Moron.sync()
.then(() => {
    console.log('Sync completed');

    Moron.findAll()
    .then(result => {
        const resultArray = JSON.parse(JSON.stringify(result, null, 2));
        a = resultArray[0].name;
        b = resultArray[1].name;

        app.get('/', (req, res) => {
            res.status(200).send(`${a} and ${b} are in love`);
        })
        
        app.listen(process.env.PORT || 3000, () => console.log('Server started!'));
    });
});

    





/*

https.get('https://jsonplaceholder.typicode.com/users', res => {
    let data = '';

    res.on('data', chunk => {
        data += chunk;
    })

    res.on('end', () => {
        data = JSON.parse(data);

        let dom = '';
        data.forEach(item => {
            dom += `
                <div style='background: black; border-radius: 0.5em; padding: 2.5em'>
                    <h2 style='color: white; margin: 0 0 0.5em 0;'>${item.name}</h2>
                    <p style='color: white; margin: 0;'>${item.email}</p>
                </div>
            `;
        })
        dom = `
            <div style='
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                font-family: Segoe UI;
                gap: 25px;
                margin: 0 auto 0 auto;
                padding-top: 50px;
                width: fit-content;
            '>${dom}</div>
        `;

        
    })
})

*/