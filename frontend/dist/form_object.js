"use strict";

$.fn.formObject = function() {
    var e = {};
    return $.each($(this).serializeArray(), function(r, n) {
        e[n.name] = n.value || "";
    }), e;
};
//# sourceMappingURL=form_object.js.map