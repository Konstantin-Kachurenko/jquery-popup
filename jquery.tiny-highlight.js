(function($){ "use strict";

  $.tinyHighlight = function(elem) {
  };
	
  $.tinyHighlight.prototype.$element = null;
	
  /** Регистрация плагина jQuery */ 
  $.fn.tinyHighlight = function() {
    return this.each(function(i, elem) {
      (new $.tinyHighlight(elem));
    });
  };
	
})(jQuery);
