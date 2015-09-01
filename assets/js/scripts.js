
function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}


jQuery(document).ready(function() {

    $(".form-first-name").val("First name...");
    $(".form-last-name").val("Last name...");
    $(".form-email").val("Email...");

    $("html").niceScroll({
        cursorcolor: "#41abef",
        cursorwidth: '8px',
        autohidemode: false,
        zindex: 999,
        mousescrollstep: 35,  // default is 40 (px)
        scrollspeed: 60, // default is 60
        autohidemode: 'cursor',
        bouncescroll: true,
        hidecursordelay: 800,
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
            { src: "assets/img/backgrounds/woman-writing-contract.jpg" },
            { src: "assets/img/backgrounds/woman-check-mailbox-surprised.jpg", animation: "kenburnsUp", animationDuration: 6500 }
	    ],

	    overlay: "assets/img/backgrounds/overlays/06.png",

	    //animation: 'kenburns',

	    delay: 6500,

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
	    console.log(e.relatedTarget);
	})

	/*$('.top-content').backstretch([
        "assets/img/backgrounds/woman-writing-contract.jpg",
        "assets/img/backgrounds/woman-check-mailbox-surprised.jpg",
        "assets/img/backgrounds/woman-typing.jpg"
	], { duration: 5000, fade: 'slow' });
    */

    $('.call-to-action-container').backstretch("assets/img/backgrounds/1.jpg");
    
    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	//$('.top-content').backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	//$('.top-content').backstretch("resize");
    });


    /* Wow */
    new WOW({
        boxClass: 'wow',      // default
        animateClass: 'animated', // default
        offset: 20,          // default is 0
        mobile: true,       // default
        live: true        // default
    }).init();

    /** Benefits Tabs **/
    $('#forLandlords').change(function () {
        $('#forLandlords').tab('show')
    });
    $('#forTenants').change(function () {
        $('#forTenants').tab('show')
    });

    $('.scrnshotToZoom').evenZoom({
        lensPinningDistance: 20
    });

    $('.scrnshotToZoom2').hover(function () {

        setTimeout(function () {
            $('.scrnshotToZoom2').evenZoom({
                lensPinningDistance: 20
            })
        }, 1000);
        
        //$(this).css('transform', 'scale(1.18,1.18)');
    })
    .mouseleave(function () {
        $(this).css('transform', 'scale(1.0,1.0)');
    });


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

});

function toggleBenefitsTabs() {
    $('#forLandlordsTab').toggleClass('active');
    $('#forTenantsTab').toggleClass('active');
    $('#forLandlordsTab').toggleClass('in');
    $('#forTenantsTab').toggleClass('in');
}

jQuery(window).load(function() {
	
	/* Loader */
	$(".loader-img").fadeOut();
	$(".loader").delay(1000).fadeOut("slow");
	
	/* Hidden images */
	$(".modal-body img, .testimonial-image img").attr("style", "width: auto !important; height: auto !important;");
	
});

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