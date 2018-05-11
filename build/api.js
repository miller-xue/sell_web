var express = require('express') // node js框架 启动webServer

var appData = require('../data');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();

export {

}
apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})
apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  })
})
apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
})

export default apiRoutes;
