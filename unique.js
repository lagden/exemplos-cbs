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
  var cbs = $.Callbacks('unique');

  cbs.add(fn1);
  cbs.add(fn1);
  cbs.add(fn1);
  cbs.add(fn2);
  cbs.add(fn2);
  cbs.fire('apenas 1 de cada');

  // Output esperado
  //
  // fn1 apenas 1 de cada
  // fn2 apenas 1 de cada

});
