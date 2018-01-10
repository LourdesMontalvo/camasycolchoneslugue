"use strict";

navigator.serviceWorker && navigator.serviceWorker.register("/sw.js"), function() {
    function e() {
        var e = t();
        e && !a ? (a = !0, i()) : !e && a && (a = !1, o());
    }
    function n() {
        $("#responsive-nav ul").toggleClass("active"), $("#menu-opener").toggleClass("glyphicon-menu-hamburger");
    }
    function i() {
        $("#description").addClass("fixed").removeClass("absolute"), $("#navigation").slideUp("fast"), 
        $("#sticky-navigation").slideDown("fast");
    }
    function o() {
        $("#description").removeClass("fixed").addClass("absolute"), $("#navigation").slideDown("fast"), 
        $("#sticky-navigation").slideUp("fast");
    }
    function t() {
        var e = $("#description").height();
        return $(window).scrollTop() > $(window).height() - 1.5 * e;
    }
    var a = !1, s = 0, r = $("[data-name='image-counter']").attr("content");
    $("#contact-form").on("submit", function(e) {
        return e.preventDefault(), sendForm($(this)), !1;
    }), $("sticky-navigation").removeClass("hidden"), $("#sticky-navigation").slideUp(0), 
    e(), function() {
        var e = new Date().getHours();
        (e < 8 || e > 18) && (console.log("Cerrado"), $("#is-open .text").html("Cerrado ahora <br> Abierto de 8:00 am - 6:00pm"));
    }(), $("#menu-opener").on("click", n), $(".menu-link").on("click", n), setInterval(function() {
        s < r - 1 ? s++ : s = 0, $("#gallery .inner").css({
            left: "-" + 100 * s + "%"
        });
    }, 3e3), console.log($(window).height()), $(window).scroll(e);
}();
//# sourceMappingURL=main.js.map