window.files = {};
var Tools = {
	base: '',
	baseAdmin: '',
	idioma: (function() {
		return navigator.language || navigator.browserLanguage
	})(),
	cargarFile: function(url, tipo, id) {
		if (!url)
			return;
		if (!tipo)
			tipo = 'js';
		if (!id)
			id = Tools.getIdUnico;
		switch (tipo) {
			case 'js':
				script = document.createElement('script');
				script.src = url;
				document.getElementsByTagName('body')[0].appendChild(script);
				break;
			case 'json':
				console.log(url);

				Tools.cargarPrincipal({
					url: url,
					method: 'get',
					json: true,
					callback: function(data, textStatus, xhr) {
						window.files[id] = {
							urlObtenido: url,
							fechaObtenido: new Date,
							datos: data
						};
					}
				});
				break;
			case 'css':
				script = document.createElement('link');
				script.href = url;
				script.rel = 'stylesheet';
				document.getElementsByTagName('head')[0].appendChild(script);
				break;
		}
	},
	notificacion: function(layout, msg, type) {
		var n = noty({
			text: msg,
			type: type,
			// dismissQueue: true,
			timeout: '2000',
			layout: 'top',
			theme: 'defaultTheme'
		});
		console.log('html: ' + n.options.id);
	},
	extraerVariables: function() {
		var currentUrl = window.location.hash.substr(1);
		var variables = currentUrl.split('&');
		window.GET = {};
		for (var i = 0; i < variables.length; i++) {
			var item = variables[i];
			eval('window.GET.' + item.split('=')[0] + '="' + item.split('=')[1] + '"');
		};
		return window.GET;
	},
	initCondicion: function() {
		$('[data-condicion]').each(function(index, el) {
			$(el).on('click', function(evt) {
				evt.preventDefault();
				if (confirm($(this).attr('data-mensaje')))
					window.location = $(this).attr('href');
				return false;
			});
		});
		$('[data-condicion-ajax]').each(function(index, el) {
			$(el).on('click', function(evt) {
				evt.preventDefault();
				if (confirm($(this).attr('data-mensaje'))) {
					Tools.cargarPrincipal({
						url: $(this).attr('href'),
						// json: true,
						callback: function(data) {
							if (data.code == 200)
								Tools.cargarPrincipal({
									url: data.url
								});
							else if (data.code == 500)
								Tools.notificacion('top', 'Error al borrar', 'alert')
						}
					});
					return false;
				}
				return false;
			});
		})
	},
	createLoader: function(div, append) {
		if (append)
			$(div).append('<div class="loader"><i class="fa fa-spinner fa-pulse"></i></div>');
		else
			$(div).html('<div class="loader"><i class="fa fa-spinner fa-pulse"></i></div>');
	},
	removeLoader: function(div) {
		$(div).find('.loader').remove();
	},
	initLinkMagicos: function() {
		$('[data-type="ajax"]').each(function(index, el) {
			$(el).unbind('click');
			$(el).on('click', function(evt) {
				evt.preventDefault();
				if ($(this).attr('data-load') == 'principal')
					Tools.cargarPrincipal({
						url: this.href
					});
				else
					Tools.cargarPrincipal({
						url: this.href,
						elemento: $(this).attr('data-load')
					});

				return false;
			});
		});
	},
	getIdUnico: (function() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	})(),
	clearStr: function(cadena) {
		if (cadena) {
			cadena = cadena.trim();
			cadena = cadena.replaceArray(
				['á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'], ['a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A']
			);

			cadena = cadena.replaceArray(
				['é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'], ['e', 'e', 'e', 'e', 'E', 'E', 'E', 'E']
			);

			cadena = cadena.replaceArray(
				['í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'], ['i', 'i', 'i', 'i', 'I', 'I', 'I', 'I']
			);

			cadena = cadena.replaceArray(
				['ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'], ['o', 'o', 'o', 'o', 'O', 'O', 'O', 'O']
			);

			cadena = cadena.replaceArray(
				['ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'], ['u', 'u', 'u', 'u', 'U', 'U', 'U', 'U']
			);

			cadena = cadena.replaceArray(
				['ñ', 'Ñ', 'ç', 'Ç'], ['n', 'N', 'c', 'C']
			);
			cadena = cadena.replaceArray(
				['&'], ['']
			);
			cadena = cadena.replaceArray([' '], ['-']);
		}
		return cadena;
	},
	cargarPrincipal: function(params) {
		// params maximos { url , params, append, callback, json,elemento,method}
		if (!params.params)
			params.params = {};
		if (!params.append)
			params.append = false;
		if (!params.json)
			params.json = false;
		if (!params.method)
			params.method = 'post';
		if (!params.elemento)
			params.elemento = '.mainSection';
		if (!params.asyn)
			params.asyn = true;
		Tools.createLoader(params.elemento);

		$.ajaxSetup({
			async: params.asyn
		});
		params.method = params.method.toLowerCase();
		switch (params.method) {
			case 'post':
				$.post(params.url, params.params, function(data, textStatus, xhr) {
					Tools.removeLoader(params.elemento);
					console.log(params.url);
					if (params.json === false) {
						if (params.append) {
							$(params.elemento).append(data);
						} else {
							$(params.elemento).html(data);
						}
					}
					if (typeof(params.callback) == 'function') {
						params.callback(data, textStatus, xhr);
					}
				}).fail(function() {
					if (typeof(params.error) == 'function') {
						params.error();
					}
				});
				break;
			case 'get':
				$.get(params.url, params.params, function(data, textStatus, xhr) {
					Tools.removeLoader(params.elemento);
					if (params.json === false) {
						if (params.append) {
							$(params.elemento).append(data);
						} else {
							$(params.elemento).html(data);
						}
					}
					if (typeof(params.callback) == 'function') {
						params.callback(data, textStatus, xhr);
					}
				}).fail(function() {
					if (typeof(params.error) == 'function') {
						params.error();
					}
				});
				break;
		}
	}
}


Array.prototype.mezclar = function() {
	var input = this;
	for (var i = input.length - 1; i >= 0; i--) {
		var randomIndex = Math.floor(Math.random() * (i + 1));
		var itemAtIndex = input[randomIndex];

		input[randomIndex] = input[i];
		input[i] = itemAtIndex;
	}
	return input;
}
String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}
String.prototype.replaceArray = function(find, replace) {
	var replaceString = this;
	var regex;
	for (var i = 0; i < find.length; i++) {
		regex = new RegExp(find[i], "g");
		replaceString = replaceString.replace(regex, replace[i]);
	}
	return replaceString;
};
Array.prototype.unique = function(inputArr) {
	var key = '',
		tmp_arr2 = {},
		val = '';
	var __array_search = function(needle, haystack) {
		var fkey = '';
		for (fkey in haystack) {
			if (haystack.hasOwnProperty(fkey)) {
				if ((haystack[fkey] + '') === (needle + '')) {
					return fkey;
				}
			}
		}
		return false;
	};
	for (key in inputArr) {
		if (inputArr.hasOwnProperty(key)) {
			val = inputArr[key];
			if (false === __array_search(val, tmp_arr2)) {
				tmp_arr2[key] = val;
			}
		}
	}
	return tmp_arr2;
};




// var request = new XMLHttpRequest();
// request.open('GET', '/my/url', true);
// request.onload = function() {
//   if (request.status >= 200 && request.status < 400) {
//     // Success!
//     var data = JSON.parse(request.responseText);
//   } else {
//     // We reached our target server, but it returned an error

//   }
// };

// request.onerror = function() {
//   // There was a connection error of some sort
// };

// request.send();





// var request = new XMLHttpRequest();
// request.open('POST', '/my/url', true);
// request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
// request.send(data);



// var request = new XMLHttpRequest();
// request.open('GET', '/my/url', true);

// request.onload = function() {
//   if (request.status >= 200 && request.status < 400) {
//     // Success!
//     var resp = request.responseText;
//   } else {
//     // We reached our target server, but it returned an error

//   }
// };

// request.onerror = function() {
//   // There was a connection error of some sort
// };

// request.send();





function fadeIn(el) {
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
    }
  };

  tick();
}

// fadeIn(el);

