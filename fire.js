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
  var cbs = $.Callbacks();

  cbs.add(fn1);       // Adiciona o método fn1 na lista
  cbs.fire('foo');    // Dispara com o valor foo
  cbs.add(fn2);       // Adiciona o método fn2 na lista
  cbs.add(fn1);       // Adiciona novamente fn1 na lista
  cbs.fire('bar');    // Dispara com o valor foo
  cbs.remove(fn1);    // remove o fn1 da lista
  cbs.fire('foobar'); // Dispara com o valor foobar

  // Esperado
  //
  // fn1 foo
  // fn1 bar
  // fn2 bar
  // fn1 bar
  // fn2 foobar

});
