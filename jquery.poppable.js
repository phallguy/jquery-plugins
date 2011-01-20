/*
 * Poppable
 * Copyright 2011 Apps In Your Pants Corporation
 * http://github.com/appsinyourpants/jquery-plugins
 *
 * Version 1.0   -   Updated: Jan. 21, 2010
 * 
 * This simple on-hover pop-up script jQuery plug-in is dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($) {
	$.fn.all = function(selector) {
		var children = $(selector, this);
		var self = this.filter(selector);
		var combined = children.add(self);
		return combined;
	}
	
	$.fn.poppable = function() {
		this.each(function() {
			var pop = $(this);
			pop.all(".trigger").each(function() {
				var trigger = $(this);
				var target = trigger.attr('popTarget');
				var popup = target ? $(target, target.indexOf('#') == 0 ? $('body') : pop) : $(".popup", pop);
				var hideTimer = null;
				var hasFocus = false;

				popup.hide();

				var hide = function() {
					hideTimer = setTimeout(function() {
						hideTimer = null;
						popup.fadeOut();
					}, 300);
				}

				$('input,textarea', popup).focus(function() { hasFocus = true });
				$('input,textarea', popup).blur(function() { hasFocus = false; hide(); });

				$($.makeArray(trigger).concat($.makeArray(popup)))
					.mouseover(function() {
						if (hideTimer) clearTimeout(hideTimer);
						var parent = trigger.offsetParent();

						popup.css({
							left: trigger.offset().left - parent.offset().left - (parent.outerWidth() - parent.width()) / 4,
							top: trigger.offset().top - parent.offset().top + trigger.outerHeight() - 1,
							position: "absolute"
						});
						popup.show();
						return false;
					})
					.mouseout(function() {
						if (hideTimer) clearTimeout(hideTimer);
						if (!hasFocus)
							hide();
						return false;
					});
			});
		});
		
		return this;
	}
})(jQuery);