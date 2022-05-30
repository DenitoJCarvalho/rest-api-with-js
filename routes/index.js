module.exports = (app) => {
  app.get('/', (req, res) => {
    res.status('200')
      .setHeader('Content-Type', 'application/json')
      .json({
        users: [{
          name: 'Curso da Hcode',
          email: 'dennis@sisplus.com.br',
          id: 1
        }]
      })
  });
};