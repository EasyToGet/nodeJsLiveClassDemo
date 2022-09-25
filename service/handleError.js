const handleError = (res, message) => {
  res.status(400).send({
    "status": "false",
    "message": message
  });
  res.end();
};

module.exports = handleError;