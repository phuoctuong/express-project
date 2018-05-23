'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require('./auth');

Object.defineProperty(exports, 'authRouter', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_auth).default;
  }
});

var _socialAuth = require('./socialAuth');

Object.defineProperty(exports, 'socialRouter', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_socialAuth).default;
  }
});

var _user = require('./user');

Object.defineProperty(exports, 'userRouter', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_user).default;
  }
});

var _post = require('./post');

Object.defineProperty(exports, 'postRouter', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_post).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map
