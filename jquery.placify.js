 /*
 * Placify
 * Copyright 2011 Apps In Your Pants Corporation
 * http://github.com/appsinyourpants/jquery-plugins
 * 
 * Add support for input HTML5 placeholder attribute for legacy and modern browsers.
 *
 * Version 1.1   -   Updated: Oct. 31, 2011
 * Version 1.0   -   Updated: Jan. 20, 2011
 *
 * This jQuery plug-in is lcensed under a Creative Commons Attribution 3.0 Unported License. http://creativecommons.org/licenses/by/3.0/
 */

(function ($) {
	var placified = [];
	$.fn.placify = function () {
		var defaults = {
			cssClass: 'placeholder',
			containerType: 'div',
			fadeSpeed: 200
		};
		var opts = $.extend(defaults, arguments[0] || {});

		this.each(function () {
			if (this.placify) {
				this.togglePlaceholderByValue();
				return;
			}
			this.placify = true;

			var input = $(this);

			// If not an input element, then placify all child inputs with a placeholder attribute. 
			if (!input.is('input')) {
				$('input[placeholder]', input).placify(opts);
				return;
			}


			var container = $('<' + opts.containerType + ' class="' + opts.cssClass + '" />')
												.click(function () { input.focus(); })
												.css({
													position: 'absolute',
													fontFamily: input.css('fontFamily'),
													fontSize: input.css('fontSize'),
													fontWeight: input.css('fontWeight'),
													lineHeight: Math.max(parseFloat(input.css('lineHeight')), input.height()) + 'px'
												})
												.append($('<label for="' + input.attr('id') + '" style="position: relative">' + input.attr('placeholder') + '</label>'));

			this.togglePlaceholderByValue = function () {
				if (input.is(":focus") || input.val().length > 0)
					container.fadeOut(opts.fadeSpeed);
				else if (input.val().length == 0)
					container.fadeIn(opts.fadeSpeed);
			};

			input.before(container)
					 .removeAttr('placeholder') // Remove so default browser rendering is hidden
					 .focus(function () { container.fadeOut(opts.fadeSpeed); })
					 .keydown(function () { setTimeout( function() { $.each( placified, function( ix, i ) { i.placify(); } ) }, 10 ) } )
					 .bind('blur change', this.togglePlaceholderByValue);

			container.find('label').css({
				top: parseInt(input.css('paddingTop')) + parseInt(input.css('borderTopWidth')) + (input.offset().top - container.offset().top),
				left: parseInt(input.css('paddingLeft')) + parseInt(input.css('borderLeftWidth')) + (input.offset().left - container.offset().left),
				display: input.val().length > 0 ? 'none' : 'block'
			})

			placified.push(input);
			// Forms auto-filled by browser do not range change events so the placeholder shows up over
			// the auto filled text. Use a delayed timer to re-evalute the content states of the placified
			// element.

			setTimeout( this.togglePlaceholderByValue, 250 );
		});

		return this;
	}

	// Automatically attach to all forms.
	$('form').placify();

})(jQuery);