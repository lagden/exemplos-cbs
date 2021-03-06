// usage: USERID=123 node user.js

'use strict';

var env = require('jsdom').env;

env('', function(errors, window) {

  // Load jQuery and XMLHttpRequest
  var XMLHttpRequest = require('xhr2');
  var $ = require('jquery')(window);

  // Config ajax
  $.support.cors = true;
  $.ajaxSetup({
    xhr: function() {
      return new XMLHttpRequest();
    }
  });

  // Request
  function getUser() {
    var id = process.env.USERID || 1;
    return $.getJSON('https://randomuser.me/g/?seed=' + id);
  }

  // Callbacks
  function nomeCompleto(r) {
    var user = r.results[0].user;
    console.log(user.name.first + ' ' + user.name.last);
  }

  function celular(r) {
    console.log(r.results[0].user.cell);
  }

  function requestFail(jqxhr, textStatus, error) {
    console.log(textStatus, error);
  }

  // Callbacks instance
  var user = $.Callbacks('memory unique');
  user.add(nomeCompleto);
  user.add(celular);

  // Call Ajax
  getUser()
    .done(user.fire)
    .fail(requestFail);

  // Using: jqXHR.then(done, fail)
  // getUser()
  //   .then(user.fire, requestFail);

});
