jQuery(window).load(function () {

    /* Loader */
    $(".loader-img").fadeOut();
    $(".loader").delay(1000).fadeOut("slow");

    /* Hidden images */
    $(".modal-body img, .testimonial-image img").attr("style", "width: auto !important; height: auto !important;");

});


jQuery(document).ready(function() {

    $(".form-email").val("Email...");

    $("html").niceScroll({
        cursorborder: 0,
        cursorcolor: "#41abef",
        cursorwidth: '10px',
        autohidemode: false,
        zindex: 9999,
        mousescrollstep: 35,  // default is 40 (px)
        scrollspeed: 60, // default is 60
        autohidemode: 'cursor',
        bouncescroll: true,
        hidecursordelay: 700,
        horizrailenabled: false
    });


	/* Navigation */
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), 0);
	});	
	

    /* Background slideshow */
	$(".top-content").vegas({
	    slides: [
            { src: "assets/img/backgrounds/woman-typing.jpg", animation: 'kenburns' },
            { src: "assets/img/backgrounds/woman-writing-contract.jpg", animation: 'kenburnsRight' },
            { src: "assets/img/backgrounds/woman-typing.jpg", animation: 'kenburnsDown' },
            { src: "assets/img/backgrounds/woman-check-mailbox-surprised.jpg", animation: "kenburnsUp", animationDuration: 6500 }
	    ],

	    overlay: "assets/img/backgrounds/overlays/06.png",

	    delay: 7500,

	    walk: function (index, slideSettings) {
	        $('#top-carousel').carousel('prev');
	    }
	});

	$('#top-carousel').on('slide.bs.carousel', function (e) {
	    if ($(e.relatedTarget).is('#slide3')) {
	        $('#slide3').css('display', 'none');

	        setTimeout(function () {
	            $('#slide3').fadeIn();
	        }, 700)
	    }
	})

    $('.call-to-action-container').backstretch("assets/img/backgrounds/1.jpg");


    /** Wow - Make Elements Animate Into View **/
    new WOW({
        boxClass: 'wow',         // default
        animateClass: 'animated',// default
        offset: 20,              // default is 0
        mobile: true,            // default
        live: true               // default
    }).init();


    /** Initialize all Tooltips & Popovers on the page **/
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();


    /** Benefits Toggle **/
    $('#forLandlords').change(function () {
        $('#forLandlords').tab('show')
    });
    $('#forTenants').change(function () {
        $('#forTenants').tab('show')
    });


    /** Always Beautiful **/
    $('.circle-screenshot').hover(function () {
        var $elem = $(this);
        $elem.find('.evenZoomLens').remove()
        setTimeout(function () {
            $elem.find('.scrnshotToZoom').evenZoom({
                lensPinningDistance: 20
            })
        }, 300)
    });


    /** Stats Hover Animation Helper (mostly uses CSS, but for stats > 50%, this JS fixes some CSS quirks **/
    $('div#hover-wrap-1').hover(function () {
        $('#circle-slice1-b .circle-color-fill').animate({
            opacity: 1
        }, 600);
    }, function () {
        $('#circle-slice1-b .circle-color-fill').animate({
            opacity: 0
        }, 125);
    })

    $('div#hover-wrap-3').hover(function () {
        $('#circle-slice3-b .circle-color-fill').animate({
            opacity: 1
        }, 700);
    }, function () {
        $('#circle-slice3-b .circle-color-fill').animate({
            opacity: 0
        }, 200);
    })

    $('div#hover-wrap-5').hover(function () {
        $('#circle-slice5-b .circle-color-fill').animate({
            opacity: 1
        }, 600);
    }, function () {
        $('#circle-slice5-b .circle-color-fill').animate({
            opacity: 0
        }, 150);
    })


    /** Pricing Box Screenshot Toggle **/
    $('#pricingBox1').hover(function () {
        $('#pricingScrnShot').attr('src', 'assets/img/devices/nooch-screenshot-property.jpg')
        $('#pricingBox1 .pricingBoxHdr').addClass('active')
        $('#pricingBox2 .pricingBoxHdr').removeClass('active')
    });
    $('#pricingBox2').hover(function () {
        $('#pricingScrnShot').attr('src', 'assets/img/devices/nooch-screenshot-pin-rotated.jpg')
        $('#pricingBox1 .pricingBoxHdr').removeClass('active')
        $('#pricingBox2 .pricingBoxHdr').addClass('active')
    });


    /** Modals **/
	$('.launch-modal').on('click', function(e){
		e.preventDefault();
		$( '#' + $(this).data('modal-id') ).modal();
	});

    /** (For Mobile): Collepse the Navbar menu when any nav link is tapped **/
	$('.navbar-collapse .scroll-link').click(function () {
	    $('.navbar-collapse').collapse('hide');
	})
});

function toggleBenefitsTabs() {
    $('#forLandlordsTab').toggleClass('active');
    $('#forTenantsTab').toggleClass('active');
    $('#forLandlordsTab').toggleClass('in');
    $('#forTenantsTab').toggleClass('in');
}


// --------------------------------------------------------
//	Navigation Bar
// -------------------------------------------------------- 	
$(window).scroll(function () {
    "use strict";
    var scroll = $(window).scrollTop();

    if (scroll > 100) {
        $(".navbar").addClass("scroll-fixed-navbar");
    } else {
        $(".navbar").removeClass("scroll-fixed-navbar");
    }
});

// --------------------------	
//	Scroll To Section
// --------------------------	
function scroll_to(clicked_link, nav_height) {
    var element_class = clicked_link.attr('href').replace('#', '.');
    var scroll_to = 0;

    if (element_class != '.top-content') {
        element_class += '-container';
        scroll_to = $(element_class).offset().top - nav_height;
    }

    if ($(window).scrollTop() != scroll_to) {
        $('html, body').stop().animate({
            scrollTop: scroll_to
        }, 1000, function () {
            if (element_class == '.top-content') {
                $('#form-email').focus()
            }
        });
    }
}

// --------------------------	
//	Scroll Up
// --------------------------	
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.scroll-up').fadeIn();
    } else {
        $('.scroll-up').fadeOut();
    }
});

$('.scroll-up').click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
});

// --------------------------	
//	Accordion (FAQ)
// --------------------------	
function toggleIcon(e) {
    $(e.target)
		.prev('.panel-heading')
		.find('.panel-title a')
		.toggleClass('active')
		.find("i.fa")
		.toggleClass('fa-plus-square fa-minus-square');
}
$('.panel').on('hidden.bs.collapse', toggleIcon);
$('.panel').on('shown.bs.collapse', toggleIcon);