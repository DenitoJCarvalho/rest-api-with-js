module.exports = {
  send: (err, req, res, code = 400) => {
    console.log(`ERROR: ${err}`);
    res.status(code).json({
      error: err
    });
  }
}