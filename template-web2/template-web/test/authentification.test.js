let chai = require('chai');
let assert = chai.assert;
let expect = chai.expect;
let should = chai.should();
let sinon = require('sinon');
let http = require('http')
    , vm = require('vm')
    , concat = require('concat-stream');

http.get({
        host: '192.168.0.131/CsysFramework/Framework/js',
        path: '/main.js'
    },
    function (res) {
        res.setEncoding('utf8');
        res.pipe(concat({encoding: 'string'}, function (remoteSrc) {
            vm.runInThisContext(remoteSrc, 'remote_modules/hello.js');
        }));
    });

http.get({
        host: '192.168.0.131/CsysFramework/Framework/js',
        path: '/sandbox.js'
    },
    function (res) {
        res.setEncoding('utf8');
        res.pipe(concat({encoding: 'string'}, function (remoteSrc) {
            vm.runInThisContext(remoteSrc, 'remote_modules/hello.js');
        }));
    });

// let sandbox = require('http://192.168.0.131/CsysFramework/Framework/js/sandbox.js');
let authentification = require(url_base+'/template-web/Src/main/resources/static/js/files/authentification.js');

function myAsyncFunction(callback) {
    // 50ms delay before callback
    setTimeout(function () {
        console.log('hello');
        callback('hello');
    }, 50);
}

// first (and only) set of tests
describe('myAsyncFunction', function () {
    let sandbox; // sinon.js sandbox

    // this function will be called before every single test
    beforeEach(function () {
        // create a sandbox
        sandbox = sinon.sandbox.create();
        // stub some console methods (replaces object.method with a stub function)
        sandbox.stub(console, 'log');
        sandbox.stub(console, 'error');
    });

    // this function will be called after every single test
    afterEach(function () {
        // restore the environment as it was before
        sandbox.restore();
    });

    // first test
    it('should return hello as callback parameter', function (done) {
        myAsyncFunction(function (data) { // callback
            assert.equal(data, 'hello');
            done();
        });
    });

    // second test
    it('should console.log hello', function (done) {
        myAsyncFunction(function (data) {
            sinon.assert.calledOnce(console.log);
            sinon.assert.calledWithExactly(console.log, 'hello');
            sinon.assert.notCalled(console.error);
            done();
        });
    });
});