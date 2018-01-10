"use strict";

!function() {
    function t() {
        e() ? o() : n($(c).find(".input:invalid").first().parent());
    }
    function e() {
        return document.querySelector(c).checkValidity();
    }
    function n(t) {
        $(".step.active").removeClass("active"), t.addClass("active"), t.find(".input").focus();
        var e = t.index(".step") + 1;
        a($(".path-step:nth-child(" + e + ")"));
    }
    function a(t) {
        $(".path-step.active").removeClass("active"), t.addClass("active");
    }
    function o() {
        var t = $(c);
        $.ajax({
            url: t.attr("action"),
            method: "POST",
            data: t.formObject(),
            dataType: "json",
            success: function() {
                t.slideUp(), $("#info-contacto").html("Hemos recibido tu correo, pronto nos pondremos en contacto contigo");
            }
        });
    }
    var c = "#contact-form";
    $(".step textarea").on("keydown", function(t) {
        13 == t.keyCode && (t.preventDefault(), $(t.target).blur());
    }), $(".path-step").on("click", function(t) {
        var e = $(t.target);
        a(e);
        var o = e.index(".path-step") + 1;
        n($(".step:nth-child(" + o + ")"));
    }), $(c).find(".input").on("change", function(a) {
        var o = $(a.target).parent().next(".step");
        !e() && o.length > 0 ? n(o) : t();
    });
}();
//# sourceMappingURL=steps.js.map