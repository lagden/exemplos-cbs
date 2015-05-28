'use strict';

var env = require('jsdom').env;

env('', function (errors, window) {

  var $ = require('jquery')(window);

  function fn1(v) {
    console.log('fn1', v);
  }

  function fn2(v) {
    console.log('fn2', v);
  }

  // Instance
  var cbs = $.Callbacks('memory');

  cbs.add(fn1);
  cbs.fire('dispara o fn2 tb!!');
  cbs.add(fn2);

  // Output esperado
  //
  // fn1 dispara o fn2 tb!!
  // fn2 dispara o fn2 tb!!

});
