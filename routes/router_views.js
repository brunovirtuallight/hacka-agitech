

module.exports = function(app) {

  app.get('/dashboards', (req, res) => {
    res.render('dashboards')
  })

}