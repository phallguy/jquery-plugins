 /*
 * Placify
 * Copyright 2011 Apps In Your Pants Corporation
 * http://github.com/appsinyourpants/jquery-plugins
 * 
 * Add support for input HTML5 placeholder attribute for legacy and modern browsers.
 *
 * Version 1.0   -   Updated: Jan. 20, 2011
 *
 * This jQuery plug-in is lcensed under a Creative Commons Attribution 3.0 Unported License. http://creativecommons.org/licenses/by/3.0/
 */

(function($) {
	$.fn.placify = function() {
		var defaults = {
			cssClass: 'placeholder',
			containerType: 'div',
			fadeSpeed: 200
		};
		var opts = $.extend(defaults, arguments[0] || {});

		this.each(function() {
			if (this.placify) return;
			this.placify = true;
			
			var input = $(this);

			// If not an input element, then placify all child inputs with a placeholder attribute. 
			if( !input.is('input') )
			{
				$('input[placeholder]',input).placify(opts);
				return;
			}

			var container = $('<' + opts.containerType + ' class="' + opts.cssClass + '" />')
												.css({
													position: 'absolute',
													display: input.val().length ? 'none' : 'block',
													left: input.position().left,
													top: input.position().top
												})
												.html('<label for="' + input.attr('id') + '">' + input.attr('placeholder') + '</label>');
												
			input.before(container)
					 .removeAttr('placeholder') // Remove so default browser rendering is hidden
					 .focus(function(){
							container.fadeOut(opts.fadeSpeed);
						})
					 .blur(function(){
							if( input.val().length == 0 )
								container.fadeIn(opts.fadeSpeed);				
						})
					 .change(function(){
							if( input.val().length > 0 )
								container.fadeOut(opts.fadeSpeed);				
							else if( input.val().length == 0 )
								container.fadeIn(opts.fadeSpeed);				
					 });
		});

		return this;
	}
})(jQuery);