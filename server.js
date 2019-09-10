//Install express server
/*jshint esversion: 6 */

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import graphqlHTTP from 'express-graphql';
import { root, schema } from './server/graphql';
import Schema from './server/Model';
import connectDatabase from './server/database';



(async () => {

    try {
        const info = await connectDatabase();
        console.log(`#### Mongodb ready at ${info.host}:${info.port}/${info.name}`);
    } catch (error) {
        console.error("#### Unable to connect to database");
        process.exit(1);
    }

    const app = express();

    app.use(cors());
    // Serve only the static files form the dist directory
    app.use(express.static(__dirname + '/dist/medicament'));
    app.use(express.static(__dirname + '/landingPage'));

    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }));

    app.get('/landingPage', function (req, res) {

        res.sendFile(path.join(__dirname + '/landingPage/index.html'));
    });
    app.get('/*', function (req, res) {

        res.sendFile(path.join(__dirname + '/dist/medicament/index.html'));
    });
    //fetchDataToMongodb();
    
    // Start the app by listening on the default Heroku port
    app.listen(process.env.PORT || 8080);

})();
function fetchDataToMongodb() {
    //addMedicament({ID:"string"});
    var content = fs.readFileSync(__dirname + '/src/assets/data.json');
    // Define to JSON type
    var jsonContent = JSON.parse(content);
    console.log(jsonContent[1].data[0]);

    jsonContent[1].data.map((v) => {
        v.REMBOURSEMENT = v.REMBOURSEMENT === 'OUI' ? true : false;
        return v;
    })
    Schema.collection.insert(jsonContent[1].data)
}