module.exports = {
  main: (req, res) => {
    res.send('Hello World!');
  },
  message: (req, res) => {
    res.send(req.hub.challenge);
  }
};
