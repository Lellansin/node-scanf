var sscanf = require('../').sscanf;
var should = require('should');

describe('scanf', function() {
  describe('#Url', function() {
    it('[%s] \t\tshould match the url 1', function (done) {
      var str = sscanf('http://www.w3cschool.cc/html/html-tutorial.html', '%s');
      should.strictEqual(str, 'http://www.w3cschool.cc/html/html-tutorial.html');
      done();
    });

    it('[%s] \t\tshould match the url 2', function (done) {
      var str = sscanf('http://search.aol.com/aol/search?enabled_terms=&s_it=comsearch&q=hello+world&s_chn=prt_main5', '%s');
      should.strictEqual(str, 'http://search.aol.com/aol/search?enabled_terms=&s_it=comsearch&q=hello+world&s_chn=prt_main5');
      done();
    });

    it('[%s] \t\tshould match the url 3', function (done) {
      var str = sscanf('https://www.google.com/search?q=hello+world&oq=hello+world&aqs=chrome..69i57j69i60l5.1379j0j4&sourceid=chrome&es_sm=93&ie=UTF-8', '%s');
      should.strictEqual(str, 'https://www.google.com/search?q=hello+world&oq=hello+world&aqs=chrome..69i57j69i60l5.1379j0j4&sourceid=chrome&es_sm=93&ie=UTF-8');
      done();
    });

    // https://github.com/Lellansin/node-scanf/issues/4
    it('[%s] \t\tshould correctly parse url with params containing special chars', function (done) {
      var str = sscanf('/my/endpoint?param1=0&parm2=[%7B%22k]', '%s');
      should.strictEqual(str, '/my/endpoint?param1=0&parm2=[%7B%22k]');
      done();
    });
  });
});
