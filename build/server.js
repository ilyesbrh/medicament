"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _graphql = require("./graphql");

var _Model = _interopRequireDefault(require("./Model"));

var _database = _interopRequireDefault(require("./database"));

//Install express server

/*jshint esversion: 6 */
(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee() {
  var info, app;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _database.default)();

        case 3:
          info = _context.sent;
          console.log("#### Mongodb ready at ".concat(info.host, ":").concat(info.port, "/").concat(info.name));
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("#### Unable to connect to database");
          process.exit(1);

        case 11:
          app = (0, _express.default)();
          app.use((0, _cors.default)()); // Serve only the static files form the dist directory

          app.use(_express.default.static(__dirname + '/dist/medicament'));
          app.use(_express.default.static(__dirname + '/landingPage'));
          app.use('/graphql', (0, _expressGraphql.default)({
            schema: _graphql.schema,
            rootValue: _graphql.root,
            graphiql: true
          }));
          
          app.get('/landingPage', function (req, res) {
            res.sendFile(_path.default.join(__dirname + '/landingPage/index.html'));
          });
          app.get('/*', function (req, res) {
            res.sendFile(_path.default.join(__dirname + '/dist/medicament/index.html'));
          }); //fetchDataToMongodb();
          // Start the app by listening on the default Heroku port

          app.listen(process.env.PORT || 8080);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 7]]);
}))();

function fetchDataToMongodb() {
  //addMedicament({ID:"string"});
  var content = _fs.default.readFileSync(__dirname + '/src/assets/data.json'); // Define to JSON type


  var jsonContent = JSON.parse(content);
  console.log(jsonContent[1].data[0]);
  jsonContent[1].data.map(function (v) {
    v.REMBOURSEMENT = v.REMBOURSEMENT === 'OUI' ? true : false;
    return v;
  });

  _Model.default.collection.insert(jsonContent[1].data);
}