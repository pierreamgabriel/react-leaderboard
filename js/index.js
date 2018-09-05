var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { style: { backgroundColor: 'red', color: 'white', fontSize: '40px', textAlign: 'center', marginBottom: '30px' } },
        'Camper Leaderboard'
      );
    }
  }]);

  return Header;
}(React.Component);

;

var Footer = function (_React$Component2) {
  _inherits(Footer, _React$Component2);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { style: { backgroundColor: 'red', color: 'white', fontSize: '20px', textAlign: 'center', marginTop: '30px' } },
        'by Pierre Macedo'
      );
    }
  }]);

  return Footer;
}(React.Component);

;

var Top = function (_React$Component3) {
  _inherits(Top, _React$Component3);

  function Top() {
    _classCallCheck(this, Top);

    return _possibleConstructorReturn(this, (Top.__proto__ || Object.getPrototypeOf(Top)).apply(this, arguments));
  }

  _createClass(Top, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'container-fluid' },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-sm-3 position first0 top' },
            '#'
          ),
          React.createElement(
            'div',
            { className: 'col-sm-3 second top' },
            'Camper Name'
          ),
          React.createElement(
            'div',
            { className: 'col-sm-3 third top' },
            React.createElement(
              'p',
              { id: 'recent', className: 'underlined', onClick: this.props.recent },
              'Points in past 30 days\u25BE'
            )
          ),
          React.createElement(
            'div',
            { className: 'col-sm-3 fourth top' },
            React.createElement(
              'p',
              { id: 'alltime', onClick: this.props.alltime },
              'All time points'
            )
          )
        )
      );
    }
  }]);

  return Top;
}(React.Component);

;

var Board = function (_React$Component4) {
  _inherits(Board, _React$Component4);

  function Board(props) {
    _classCallCheck(this, Board);

    var _this4 = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

    _this4.componentDidMount = _this4.componentDidMount.bind(_this4);
    _this4.showData = _this4.showData.bind(_this4);
    _this4.sendData = _this4.sendData.bind(_this4);
    _this4.recent = _this4.recent.bind(_this4);
    _this4.alltime = _this4.alltime.bind(_this4);
    return _this4;
  }

  _createClass(Board, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $.ajax({
        url: "https://fcctop100.herokuapp.com/api/fccusers/top/recent",
        dataType: "json",
        cache: false,
        success: function (json) {

          this.sendData(json);
        }.bind(this)
      });
    }
  }, {
    key: 'recent',
    value: function recent() {
      users = users.sort(function (a, b) {
        return b.recent - a.recent;
      });
      changeText();
      function changeText() {
        document.getElementById("recent").classList.add("underlined");document.getElementById("alltime").classList.remove("underlined");
        document.getElementById("recent").innerHTML = "Points in past 30 days&#9662;";
        document.getElementById("alltime").innerHTML = "All time points";
      }

      this.showData(users);
    }
  }, {
    key: 'alltime',
    value: function alltime() {
      users = users.sort(function (a, b) {
        return b.alltime - a.alltime;
      });
      changeText();
      function changeText() {
        document.getElementById("recent").classList.remove("underlined");document.getElementById("alltime").classList.add("underlined");document.getElementById("recent").innerHTML = "Points in past 30 days";
        document.getElementById("alltime").innerHTML = "All time points&#9662;";
      }
      this.showData(users);
    }
  }, {
    key: 'sendData',
    value: function sendData(objects) {
      window.users = objects;
      this.showData(users);
    }
  }, {
    key: 'showData',
    value: function showData(objects) {
      var tempUsers = objects;
      getData();
      function getData() {
        document.getElementById('board').innerHTML = "";
        var numbers = 1;
        for (var i = 0; i < 100; i++) {
          var append = '<div class="container-fluid board"><div class="row"><div class="col-sm-3 first">' + numbers + '</div><div class="col-sm-3 second"><img class="img-responsive img" src="' + tempUsers[i]['img'] + '"/><p class="username">' + tempUsers[i]['username'] + '</p></div>' + '<div class="col-sm-3 third">' + tempUsers[i]['recent'] + '</div>' + '<div class="col-sm-3 fourth">' + tempUsers[i]['alltime'] + '</div></div></div>';

          $('#board').append(append);
          numbers = numbers + 1;
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(Top, { recent: this.recent, alltime: this.alltime }),
        React.createElement('div', { id: 'board' })
      );
    }
  }]);

  return Board;
}(React.Component);

;

var FullApp = function (_React$Component5) {
  _inherits(FullApp, _React$Component5);

  function FullApp() {
    _classCallCheck(this, FullApp);

    return _possibleConstructorReturn(this, (FullApp.__proto__ || Object.getPrototypeOf(FullApp)).apply(this, arguments));
  }

  _createClass(FullApp, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(Header, null),
        React.createElement(Board, null),
        React.createElement(Footer, null)
      );
    }
  }]);

  return FullApp;
}(React.Component);

;
ReactDOM.render(React.createElement(FullApp, null), document.getElementById('main'));
