(function($){ "use strict";

	$.tinyHighlight = function(elem) {

		this.$element = $(elem);
		var code = this.$element.html();
		
		code = code.replace(/((?:<!--.*?-->)|(?:\/\*.*?\*\/))/gm, '<span class="tiny-highlight-comment">$1</span>');

		this.$element.html(code);
	};
	
	$.tinyHighlight.prototype.$element = null;
	
    /** Регистрация плагина jQuery */ 
    $.fn.tinyHighlight = function() {
        return this.each(function(i, elem) {
            (new $.tinyHighlight(elem));
        });
    };
	
})(jQuery);
