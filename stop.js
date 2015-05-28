'use strict';

var env = require('jsdom').env;

env('', function (errors, window) {

  var $ = require('jquery')(window);

  function fn1(v) {
    console.log('fn1', v);
  }

  function fn2(v) {
    console.log('fn2', v);
    return false;
  }

  function fn3(v) {
    console.log('fn3', v);
  }

  // Instance
  var cbs = $.Callbacks('stopOnFalse');

  cbs.add(fn1);
  cbs.add(fn2);
  cbs.add(fn3);
  cbs.fire('para no fn2');

  // Output esperado
  //
  // fn1 para no fn2
  // fn2 para no fn2

});
