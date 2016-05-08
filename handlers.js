let
  sender = require('./sender');

module.exports = {
  main: (req, res) => {
    res.send('Hello World!');
  },
  subscribe: (req, res) => {
    if (req.query["hub.verify_token"] === process.env.TOKEN) {
      res.send(req.query["hub.challenge"]);
    } else {
      res.send("Error, cannot validate token.");
    }
  },
  message: (req, res) => {
    console.log(req.body.entry);
    for (var i in req.body.entry) {
      for (var e in req.body.entry[i].messaging) {
        let msg = req.body.entry[i].messaging[e];
        sender.sendMessage(msg.sender.id, msg.message.text)
        .then((res) => {
          console.log(res);
          res.send({ status: "Ok" });
        }).catch((err) => {
          console.log(err.error.message);
          res.send({ status: "Error", error: err.error });
        });
      }
    }
  }
};
