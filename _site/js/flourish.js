function Flourish ( options )
{
	var defaults = {
		saveHistoryEntry: true,
		replaceContents: true,
		replaceBodyClasses: true,
		replaceDelay: false,
		replaceIgnoreClasses: [],
		bodyTransitionClass: "flourish-loading",
		childrenTransitionClass: "flourish-removing",
		fileExt: ["jpg", "jpeg", "bmp", "gif", "png", "webp"]
	};

	this.options = this.extend(defaults, options || {});

	this.fileRx = new RegExp("\.(" + this.options.fileExt.join("|") + ")$", "i");

	if( typeof history.replaceState === "function" ) {
		history.replaceState({url: location.href}, "", location.href);
	}
}

Flourish.prototype = {

	pushStateOK: typeof history.pushState === "function",

	events: {
		pre_fetch: [],
		post_fetch: [],
		post_replace: []
	},

	on: function( name, callback )
	{
		if( typeof callback === "function" )
		{
			if( this.events[name] === void 0 ) {
				this.events[name] = [];
			}

			this.events[name].push(callback);
		}
	},

	off: function( name, callback )
	{
		var e = this.events[name];
		var i;

		if( e && e.length )
		{
			if( typeof callback === "function" )
			{
				i = e.indexOf(callback);

				if( i > -1 ) {
					e.splice(i, 1);
				}
			}
			else
			{
				e.length = 0;
			}
		}
	},

	fire: function( name )
	{
		var e = this.events[name];

		if( e && e.length )
		{
			var args = Array.prototype.slice.apply(arguments).slice(1);

			e.forEach(function(f)
			{
				if( typeof f === "function" ) {
					f.apply(f, args);
				}
			});
		}
	},

	getDocumentElement: function( text )
	{
		var div = document.createElement("div");
		div.innerHTML = text;
		return div;
	},

	getDocumentTitle: function( text )
	{
		var title = text.match(/<title>([^\<]*?)<\/title>/i);

		if( title && title[1] ) {
			return title[1].trim();
		}

		return "";
	},

	getDocumentClasses: function( text )
	{
		var htmlTag = text.match(/<html[^>]*>/i)[0];
		var bodyTag = text.match(/<body[^>]*>/i)[0];

		var htmlClasses = htmlTag.match(/class=['|"](.*?)['|"]/i);

		if( htmlClasses && htmlClasses[1] ) {
			htmlClasses = htmlClasses[1].trim();
		}

		var bodyClasses = bodyTag.match(/class=['|"](.*?)['|"]/i);

		if( bodyClasses && bodyClasses[1] ) {
			bodyClasses = bodyClasses[1].trim();
		}

		return {
			html: htmlClasses || "",
			body: bodyClasses || ""
		}
	},

	extend: function( base, extra )
	{
		for( var i in extra )
		{
			if( extra.hasOwnProperty(i) ) {
				base[i] = extra[i];
			}
		}

		return base;
	},

	fetch: function( options )
	{
		var self = this;

		options = options || {};

		if( typeof options === "string" ) {
			options = {url: options};
		}

		this.fire("pre_fetch", options);

		var onsuccess = typeof options.onsuccess === "function" ? 
			options.onsuccess : this.onsuccess.bind(this);
		var onerror = typeof options.onerror === "function" ? 
			options.onerror : this.onerror.bind(this);

		if( ! options || ! options.url || this.fileRx.test(options.url) ) {
			return false;
		}

		var request = new XMLHttpRequest();
		
		request.open("GET", options.url, true);

		request.onload = function( progress )
		{
			if( request.status >= 200 && request.status < 400 ) {
				onsuccess(request, options, self);
			} else {
				onerror(request, options, self);
			}
		};

		request.onerror = onerror;
		request.send();

		return this;
	},

	onsuccess: function( request, options, self )
	{
		var text = request.responseText;
		var output = {
			title: this.getDocumentTitle(text),
			documentClasses: this.getDocumentClasses(text),
			el: this.getDocumentElement(text)
		};

		options = this.extend(this.extend({}, this.options), options);

		this.fire("post_fetch", options, output, self);

		if( options.extractSelector )
		{
			output.el = output.el.querySelector(options.extractSelector);

			if( ! output.el ) {
				return false;
			}
		}

		if( options.saveHistoryEntry && options.eventType !== "popstate" ) {
			this.addHistoryEntry({url: options.url});
		}

		if( options.replaceContents ) {
			this.replaceContents(options, output);
		}

		return output;
	},

	onerror: function( request, options, self )
	{
		console.error(request.status);
	},

	replaceContents: function( options, output, extendOptions )
	{
		if( extendOptions ) {
			options = this.extend(this.extend({}, this.options), options);
		}

		var container = document.querySelector(options.replaceSelector);

		if( container )
		{
			var documentTitle = document.getElementsByTagName("title")[0];
			var bodyEl = document.getElementsByTagName("body")[0];
			var len = 0;
			var i = 0;

			if( options.replaceBodyClasses )
			{
				bodyEl.className = output.documentClasses.body;

				if( options.bodyTransitionClass ) {
					bodyEl.className += options.bodyTransitionClass;
				}
			}

			documentTitle.innerHTML = output.title;

			if( Number(options.replaceDelay) ) {
				this.replaceContentsWithDelay(options, container, output.el.children);
			} else {
				this.replaceContentsNow(options, container, output.el.children);
			}
		}
	},

	replaceContentsNow: function ( options, container, newNodes )
	{
		var ignoredClasses = options.replaceIgnoreClasses;
		var oldNodes = container.children;
		var matchedClasses = [];
		var hasClasses = [];
		var child;
		var i = 0;

		if( ignoredClasses.length )
		{
			len = oldNodes.length;

			while( len > 0 )
			{
				child = oldNodes[len-1];

				if( child )
				{
					hasClasses = this.hasAnyClasses(child, ignoredClasses);

					if( hasClasses.length === 0 ) {
						container.removeChild(child);
					} else {
						matchedClasses = matchedClasses.concat(hasClasses);
					}
				}

				len--;
			}

			len = newNodes.length;
			i = 0;

			while( len > 0 )
			{
				child = newNodes[i];

				if( child )
				{
					hasClasses = this.hasAnyClasses(child, matchedClasses);

					if( hasClasses.length === 0 ) {
						container.appendChild(child);
					} else {
						child.parentNode.removeChild(child);
						i++;
					}
				}

				len--;
			}
		}
		else
		{
			while( oldNodes.length > 0 )
			{
				container.removeChild(oldNodes[i]);
			}

			while( newNodes.length > 0 )
			{
				container.appendChild(newNodes[i]);
			}
		}

		this.fire("post_replace");
	},

	replaceContentsWithDelay: function ( options, container, newNodes )
	{
		var self = this;
		var ignoredClasses = options.replaceIgnoreClasses;
		var oldNodes = container.children;
		var len = oldNodes.length;
		var matchedClasses = [];
		var hasClasses = [];
		var child;
		var i = 0;

		if( options.childrenTransitionClass )
		{
			while( len > 0 )
			{
				child = oldNodes[len-1];

				if( child )
				{
					// give the transition class only to nodes about to be removed
					if( this.hasAnyClasses(child, ignoredClasses).length === 0 ) {
						child.className += " " + options.childrenTransitionClass;
					}
				}

				len--;
			}
		}

		setTimeout(function()
		{
			if( ignoredClasses.length )
			{
				len = oldNodes.length;

				while( len > 0 )
				{
					child = oldNodes[len-1];

					if( child )
					{
						hasClasses = self.hasAnyClasses(child, ignoredClasses);

						if( hasClasses.length === 0 ) {
							container.removeChild(child);
						} else {
							matchedClasses = matchedClasses.concat(hasClasses);
						}
					}

					len--;
				}

				while( newNodes.length > 0 )
				{
					child = newNodes[0];

					if( child )
					{
						hasClasses = self.hasAnyClasses(child, matchedClasses);

						if( hasClasses.length === 0 )
						{
							if( options.childrenTransitionClass ) {
								child.className += " " + options.childrenTransitionClass;
							}

							container.appendChild(child);
						}
						else
						{
							child.parentNode.removeChild(child);
						}
					}
				}
			}
			else
			{
				while( container.children.length > 0 )
				{
					container.removeChild(container.children[0]);
				}

				while( newNodes.length > 0 )
				{
					if( options.childrenTransitionClass ) {
						newNodes[0].className += " " + options.childrenTransitionClass;
					}

					container.appendChild(newNodes[0]);
				}
			}

			if( options.childrenTransitionClass )
			{
				setTimeout(function()
				{
					c = container.children;
					len = c.length;

					for(i = 0; i < len; i++ )
					{
						self.removeClass(c[i], options.childrenTransitionClass);
					}
				}, 25);
			}

			self.fire("post_replace");

		}, options.replaceDelay);
	},

	unique: function (val, i, arr)
	{
		return arr.lastIndexOf(val) === i;
	},

	hasAnyClasses: function ( el, classList )
	{
		var elClasses = el.className.split(/\s+/);

		return elClasses.reduce(function(arr, c){
			if( classList.indexOf(c) > -1 ) {
				arr.push(c);
			}
			return arr;
		}, []).filter(this.unique);
	},

	removeClass: function(el, name)
	{
		if( el && el.className && typeof el.className === "string" )
		{
			el.className = el.className.split(" ").reduce(function( arr, c ) {
				c = c.trim();
				if( c.length && c !== name ) { arr.push(c); }
				return arr;
			}, []).join(" ");
		}
	},

	addHistoryEntry: function ( data )
	{
		if( this.pushStateOK ) {
			history.pushState(data, null, data.url);
		}
	}
}
