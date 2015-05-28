// usage: USERID=123 node deferred.js

'use strict';

var env = require('jsdom').env;

env('', function(errors, window) {

  // Load jQuery
  var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
  var $ = require('jquery')(window);

  // Ajax
  $.support.cors = true;
  $.ajaxSettings.xhr = function() {
    return new XMLHttpRequest();
  };

  // Request
  function getUser(id) {
    id = process.env.USERID || id;
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
  getUser(1)
    .done(user.fire)
    .fail(requestFail);
});
