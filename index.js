'use strict';

var env = require('jsdom').env;

env('', function (errors, window) {

  var $ = require('jquery')(window);
  // var flags = [
  //   'fired', // Default
  //   'once',
  //   'memory',
  //   'unique',
  //   'stopOnFalse'
  // ];

  function fn1(v) {
    console.log('fn1', v);
  }

  function fn2(v) {
    console.log('fn2', v);
    return false;
  }

  // Instance
  var cbs = $.Callbacks();

  cbs.add(fn1);
  cbs.fire('foo');
  cbs.add(fn2);
  cbs.add(fn1);
  cbs.fire('bar');
  cbs.remove(fn1);
  cbs.fire('foobar');

});
