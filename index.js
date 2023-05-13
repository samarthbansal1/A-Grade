(async () => {

    const WebSocket = require("ws");
    const path = require("path");
    const scrape = require("./scrape.js");
    const express = require("express");
    const app = express();

    app.get("/", (req, res) => {
        res.sendFile("webp.html", { root: "./gradeViewer/" })
    })

    const server = app.listen(process.env.PORT || 5500, () => console.log("listening"))

    const wsServer = new WebSocket.Server({ server });



    wsServer.on("connection", client => {
        // client.send(JSON.stringify(classGrades));
        client.on("message", async msg => {
            const classGrades = await scrape(...msg.toString().split(","));
            console.log(classGrades);
            client.send(JSON.stringify(classGrades));
        });
    });

})();