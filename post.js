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

  // Post
  function post() {
    return $.post('https://webflow.com/api/v1/form/53ebd99b34a1425d72e7bd22', {
      'name': 'Email Form',
      'source': 'http://maeguru.com.br/contato.html',
      'test': 'false',
      'fields': {
        'Nome': 'nodeBot',
        'E-mail': 'bot@node.com',
        'Mensagem': 'Intergalactic planetary / Planetary intergalactic.'
      }
    });
  }

  // Callbacks
  function resposta(r) {
    console.log(r);
  }

  function requestFail(jqxhr, textStatus, error) {
    console.log(textStatus, error);
  }

  // Callbacks instance
  var user = $.Callbacks('memory unique');
  user.add(resposta);

  // Call Ajax
  post()
    .done(user.fire)
    .fail(requestFail);
});
