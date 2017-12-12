var request = require('supertest');
var assert = require('assert');
var app = require('../src/').app;
var cb = require('../src/cb').cb;

var cookies;
describe('POST /user/login', function () {
  it('should respond with json', function (done) {
    request(app)
      .get('/')
      .expect(200, function (err, res) {
        console.log(res.headers);
        cookies = res.headers['set-cookie'];

        assert(cookies !== null);
        assert(res.body, 1);
        done();
      });
  });

  it('should respond with json', function (done) {
    var req = request(app)
      .get('/');
    req.cookies = cookies;
    req
      .expect(200, function (err, res) {
        assert(res.body, 2);
        done();
      });
  });

  // it('should respond with json', function (done) {
  //   var req = request(app)
  //     .get('/2');
  //   req.cookies = cookies;
  //   req
  //     .expect(200, function (err, res) {
  //       console.log(res.body);
  //       // assert(res.body.page, 3);
  //       done();
  //     });
  // });


  it('should test error', function () {
    let func = cb();
    assert(!func(new Error('Test Error')));
    assert(!func(true));
  });

  it('should test error 1', function () {
    let func = cb(function(data){
      assert(data === 'hello world');
      console.log('cb:');
      // done();
    });
    func(false, 'hello world');
  });

});
