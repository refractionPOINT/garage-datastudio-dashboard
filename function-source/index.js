exports.garageDashboard = (req, res) => {
  let message = req.body;
  console.log( JSON.stringify( message ) );
  res.status(200).send(message);
};
