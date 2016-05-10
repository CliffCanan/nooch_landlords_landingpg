var isRentScene_Global = false;
var pp;
var isPPinit = false;

jQuery(window).load(function ()
{
    /* Loader */
    $('.loader-img').fadeOut();
    $('.loader').delay(500).fadeOut('slow');
    /* Hidden images */
    $('.modal-body img, .testimonial-image img').attr('style', 'width: auto !important; height: auto !important;');
});

jQuery(document).ready(function ()
{
    $('html').niceScroll({
        cursorborder: 0,
        cursorcolor: '#41abef',
        cursorwidth: '10px',
        zindex: 9999,
        mousescrollstep: 30,
        // default is 40 (px)
        scrollspeed: 52, //updated 3.28.16
        // default is 60
        autohidemode: 'cursor',
        bouncescroll: true,
        hidecursordelay: 700,
        horizrailenabled: false
    });

    /* Navigation */
    $('a.scroll-link').on('click', function (e)
    {
        e.preventDefault();
        scroll_to($(this), 0);
    });

    /* Background slideshow */
    $('.top-content').vegas({
        slides: [
          {
              src: 'landlordlandingpage/assets/img/backgrounds/woman-typing.jpg',
              animation: 'kenburns'
          },
          {
              src: 'landlordlandingpage/assets/img/backgrounds/woman-writing-contract.jpg',
              animation: 'kenburnsRight'
          },
          {
              src: 'landlordlandingpage/assets/img/backgrounds/nooch-rent-payments-cash-exchange.jpg',
              animation: 'kenburnsDown'
          },
          {
              src: 'landlordlandingpage/assets/img/backgrounds/woman-check-mailbox-surprised.jpg',
              animation: 'kenburnsUp',
              animationDuration: 7000
          }
        ],
        overlay: 'landlordlandingpage/assets/img/backgrounds/overlays/06.png',
        delay: 8000,
        walk: function (index, slideSettings)
        {
            $('#top-carousel').carousel('prev');
        }
    });

    $('#top-carousel').on('slide.bs.carousel', function (e)
    {
        if ($(e.relatedTarget).is('#slide3')) {
            $('#slide3').css('display', 'none');
            setTimeout(function ()
            {
                $('#slide3').fadeIn();
            }, 700);
        }
    });

    $('.call-to-action-container').backstretch('landlordlandingpage/assets/img/backgrounds/living-room.jpg');
    $('.how-it-works-container').backstretch('landlordlandingpage/assets/img/backgrounds/bg-city.jpg');

    function getParameterByName(name)
    {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'), results = regex.exec(location.search);
        return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    isRentScene = getParameterByName('rs');
    if (isRentScene == '1' ||
        window.location.pathname.indexOf('rentscene') > -1)
    {
        $('.wow').removeClass('wow');

        isRentScene_Global = true;

        $('body').addClass('rentscene');
        $('.brand-nm').text('Rent Scene');

        $('.navbar-brand').attr('src', 'http://www.rentscene.com/');

        setTimeout(function ()
        {
            $('.fb-link').attr('href', 'https://www.facebook.com/RentScene');
            $('.tw-link').attr('href', 'https://www.twitter.com/RentScene');
            $('.gplus-link').attr('href', 'https://plus.google.com/u/1/b/109725277970836019964/+RentScenePhiladelphia/about');
            $('.ig-link').attr('href', 'https://instagram.com/rentscene');
        }, 2000);
    }
    else {
        /** Wow - Make Elements Animate Into View **/
        new WOW({
            boxClass: 'wow',
            // default
            animateClass: 'animated',
            // default
            offset: 10,
            // default is 0
            mobile: false,
            live: true
        }).init();
    }

    var pricing = getParameterByName('prc');
    if (pricing.indexOf('alt') > -1 ||
        isRentScene_Global) {
        $('.pricingAmnt').text('1.00');
        $('.pricingToHide').addClass('hide');
        $('#pricingSlogan').html('No hidden fees. &nbsp;Period.');
    }

    /** Initialize all Tooltips & Popovers on the page **/
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    /** Initialize Floating Pointer **/
    setTimeout(function ()
    {
        pp = $('#emailGrp').pointPoint();
        isPPinit = true;
    }, 1000);

    /** Benefits Toggle **/
    $('#forLandlords').change(function ()
    {
        $('#forLandlords').tab('show');
    });
    $('#forTenants').change(function ()
    {
        $('#forTenants').tab('show');
    });

    /** Stats Hover Animation Helper (mostly uses CSS, but for stats > 50%, this JS fixes some CSS quirks **/
    $('div#hover-wrap-1').hover(function () {
        $('#circle-slice1-b .circle-color-fill').animate({ opacity: 1 }, 600);
    }, function () {
        $('#circle-slice1-b .circle-color-fill').animate({ opacity: 0 }, 125);
    });
    $('div#hover-wrap-3').hover(function () {
        $('#circle-slice3-b .circle-color-fill').animate({ opacity: 1 }, 700);
    }, function () {
        $('#circle-slice3-b .circle-color-fill').animate({ opacity: 0 }, 200);
    });
    $('div#hover-wrap-5').hover(function () {
        $('#circle-slice5-b .circle-color-fill').animate({ opacity: 1 }, 600);
    }, function () {
        $('#circle-slice5-b .circle-color-fill').animate({ opacity: 0 }, 150);
    });

    /** Pricing Box Screenshot Toggle **/
    $('#pricingBox1').hover(function ()
    {
        $('#pricingScrnShot').attr('src', 'landlordlandingpage/assets/img/devices/nooch-screenshot-property.jpg');
        $('#pricingBox1 .pricingBoxHdr').addClass('active');
        $('#pricingBox2 .pricingBoxHdr').removeClass('active');
    });
    $('#pricingBox2').hover(function ()
    {
        $('#pricingScrnShot').attr('src', 'landlordlandingpage/assets/img/devices/nooch-screenshot-pin-rotated.jpg');
        $('#pricingBox1 .pricingBoxHdr').removeClass('active');
        $('#pricingBox2 .pricingBoxHdr').addClass('active');
    });

    /** Modals **/
    $('.launch-modal').on('click', function (e)
    {
        e.preventDefault();
        $('#' + $(this).data('modal-id')).modal();
    });
    /** (For Mobile): Collepse the Navbar menu when any nav link is tapped **/
    $('.navbar-collapse .scroll-link').click(function ()
    {
        $('.navbar-collapse').collapse('hide');
    });
});

// -----------------------------
//   SUBMIT EMAIL ADDRESS FORM
// -----------------------------
// unblock when ajax activity stops 
$(document).ajaxStop($.unblockUI);

var flag = false;
$('#signup-form .btn').bind('touchend click', function ()
{
    if (!flag) {
        flag = true;
        setTimeout(function ()
        {
            flag = false;
        }, 200);
        attemptEmailSubmit();
    }
    return false;
});

$('#signup-form').submit(function (e)
{
    e.preventDefault();
    attemptEmailSubmit();
});

attemptEmailSubmit = function ()
{
    var email = $('#mce-EMAIL').val();

    if (ValidateEmail(email))
    {
        updateValidationUI(true, "body");
        // ADD THE LOADING BOX
        $.blockUI({
            message: '<span><i class="fa fa-refresh fa-spin fa-loading"></i></span><br/><span class="loadingMsg">Submitting...</span>',
            css: {
                border: 'none',
                padding: '26px 10px 23px',
                backgroundColor: '#000',
                '-webkit-border-radius': '12px',
                '-moz-border-radius': '12px',
                'border-radius': '12px',
                opacity: '.82'
            }
        });

        var emailToSave = $('#mce-EMAIL').val();

        var note1 = 'Landlords Landing Page - Body';
        var note2 = isRentScene_Global ? 'Rent Scene' : 'Nooch';

        $.ajax({
            type: 'POST',
            url: 'https://www.noochme.com/CampaignServices/api/Services/SaveNewEmailForLandlordsApp',
            data: { 'Email': emailToSave, 'Note1': note1, 'Note2': note2},
            success: function (msg)
            {
                //console.log(msg);
                $('#mce-EMAIL').val('');

                ga('send', 'event', 'LandlordLead', 'Submit', 'MainPageInput', 5);

                fbq('track', 'Lead', {
                    content_name: 'Landlord',
                    content_category: 'NoochForLandlords_EmailSubmit',
                    value: 10.0,
                    currency: 'USD'
                });

                setTimeout(function ()
                {
                    window.location = "http://www.noochme.com/landlords2/login.html?from=lp1&em=" + emailToSave;
                }, 300);

                /*if (msg.IsSuccess == true) {
                    swal({
                        title: 'Great Success',
                        text: '<p>Thanks for your interest in Nooch For Landlords!</p><p>We\'ll be in touch in the next few days about how to get started using Nooch to collect rent payments.</p>',
                        type: 'success',
                        confirmButtonText: 'Awesome',
                        html: true
                    });
                }
                else { // show success msg no matter what
                    swal({
                        title: 'Great Success',
                        text: '<p>Thanks for your interest in Nooch For Landlords!</p><p>We\'ll be in touch in the next few days about how to get started using Nooch to collect rent payments.</p>',
                        type: 'success',
                        confirmButtonText: 'OK',
                        html: true
                    });
                }*/
            },
            Error: function (x, e)
            {
                // On Error
                console.log(x);
                console.log(e);
                swal({
                    title: 'Oh No',
                    text: 'Looks like we had trouble submitting your email address.  Sorry about this - we hate it when this happens too!  Please try again later.',
                    type: 'error',
                    confirmButtonText: 'OK  :-('
                });
            }
        });
    } else {
        updateValidationUI(false, "body");
    }
};
ValidateEmail = function (str)
{
    console.log("ValidateEmail -> input: [" + str + "]");
    var at = '@';
    var dot = '.';
    var lat = str.indexOf(at);
    var lstr = str.length;
    var ldot = str.indexOf(dot);
    if (lat == -1 || lat == 0 || lat == lstr) {
        return false;
    }
    if (ldot == -1 || ldot == 0 || ldot == lstr) {
        return false;
    }
    if (str.indexOf(at, lat + 1) != -1) {
        return false;
    }
    if (str.substring(lat - 1, lat) == dot || str.substring(lat + 1, lat + 2) == dot) {
        return false;
    }
    if (str.indexOf(dot, lat + 2) == -1) {
        return false;
    }
    if (str.indexOf(' ') != -1) {
        return false;
    }
    return true;
};
updateValidationUI = function (success, source)
{
    var input = (source == "sumo") ? input = "emailSumoGrp" : input = "emailGrp";

    if (success == true) {
        $('#' + input).removeClass('has-error').addClass('has-success');
        if ($('#' + input + ' .help-block').length) {
            $('#' + input + ' .help-block').slideUp(400, 'swing');
        }
    }
    else {
        $('#' + input).removeClass('has-success').addClass('has-error');
        var helpBlockTxt = 'Please enter your full email address.';

        if (!$('#' + input + ' .help-block').length) {
            $('#' + input).append('<small class="help-block pull-left" style="display:none">' + helpBlockTxt + '</small>');
            $('#' + input + ' .help-block').slideDown(300, 'swing');
        } else {
            $('#' + input + ' .help-block').show();
        }
        // Now focus on the element that failed validation
        setTimeout(function ()
        {
            $('#' + input + ' input').focus();
        }, 200);
    }
};


attemptEmailSubmitSumo = function (input)
{
    var emailToSave = input;

    console.log("attemptEmailSubmitSumo emailToSave is: " + emailToSave);

    updateValidationUI(true, "sumo");
    // ADD THE LOADING BOX
    $.blockUI({
        message: '<span><i class="fa fa-refresh fa-spin fa-loading"></i></span><br/><span class="loadingMsg">Submitting...</span>',
        css: {
            border: 'none',
            padding: '26px 10px 23px',
            backgroundColor: '#000',
            '-webkit-border-radius': '12px',
            '-moz-border-radius': '12px',
            'border-radius': '12px',
            opacity: '.82'
        }
    });

    var note1 = 'Landlords Landing Page - SumoMe';
    var note2 = isRentScene_Global ? 'Rent Scene' : 'Nooch';

    $.ajax({
        type: 'POST',
        url: 'https://www.noochme.com/CampaignServices/api/Services/SaveNewEmailForLandlordsApp',
        data: { 'Email': emailToSave, 'Note1': note1, 'Note2': note2 },
        success: function (msg)
        {
            //console.log(msg);
            //$('#mce-EMAIL').val('');
            return;
            $('#sumome-modal-mask').fadeOut(900);
            $('.sumome-scrollbox-popup').fadeOut(900);

            ga('send', 'event', 'LandlordLead', 'Submit', 'SumoInput', 5);

            fbq('track', 'Lead', {
                content_name: 'Landlord',
                content_category: 'ScrollBox',
                value: 10.0,
                currency: 'USD'
            });

            setTimeout(function ()
            {
                window.location = "http://www.noochme.com/landlords2/login.html?from=lp1&em=" + emailToSave;
            }, 300);

            /*if (msg.IsSuccess == true) {
                swal({
                    title: 'Great Success',
                    text: '<p>Thanks for your interest in Nooch For Landlords!</p><p>We\'ll be in touch in the next few days about how to get started using Nooch to collect rent payments.</p>',
                    type: 'success',
                    confirmButtonText: 'Awesome',
                    html: true
                });
            }*/
        },
        Error: function (x, e)
        {
            // On Error
            console.log(x);
            console.log(e);
            //swal({
            //    title: 'Oh No',
            //    text: 'Looks like we had trouble submitting your email address. We hate it when this happens too - sorry about this... Please try again later.',
            //    type: 'error',
            //    confirmButtonText: 'Oh, ok  :-('
            //});
            alert("Oh No! Looks like we had trouble submitting your email address. We hate it when this happens too - sorry about this... Please try again later.")
        }
    });
};


// -----------------------------
//	Navigation Bar
// -----------------------------
$(window).scroll(function ()
{
    'use strict';
    var scroll = $(window).scrollTop();
    if (scroll > 80)
    {
        $('.navbar').addClass('scroll-fixed-navbar');

        if (scroll > 480 && isPPinit) {
            console.log('Scroll below 80px - destroying floating pointer');
            pp.destroyPointPoint();
            isPPinit = false;
        }
        else if (scroll < 480 && !isPPinit) {
            console.log('Scroll above 80px - re-initializing floating pointer');
            pp = $('#emailGrp').pointPoint();
            isPPinit = true;
        }
    }
    else {
        $('.navbar').removeClass('scroll-fixed-navbar');
    }
});
// -----------------------------
//	Scroll To Section
// -----------------------------
function scroll_to(clicked_link, nav_height)
{
    var element_class = clicked_link.attr('href').replace('#', '.');
    var scroll_to = 0;
    if (element_class != '.top-content') {
        element_class += '-container';
        scroll_to = $(element_class).offset().top - nav_height;
    }
    if ($(window).scrollTop() != scroll_to) {
        $('html, body').stop().animate({ scrollTop: scroll_to }, 1000, function ()
        {
            if (element_class == '.top-content') {
                $('#mce-EMAIL').focus();
            }
        });
    }
}
// -----------------------------
//	Scroll Up
// -----------------------------
$(window).scroll(function ()
{
    if ($(this).scrollTop() > 100) {
        $('.scroll-up').fadeIn();
    } else {
        $('.scroll-up').fadeOut();
    }
});
$('.scroll-up').click(function ()
{
    $('html, body').animate({ scrollTop: 0 }, 600);
    return false;
});
// --------------------------	
//	Benefits Tab
// --------------------------	
function toggleBenefitsTabs()
{
    $('#forLandlordsTab').toggleClass('active');
    $('#forTenantsTab').toggleClass('active');
    $('#forLandlordsTab').toggleClass('in');
    $('#forTenantsTab').toggleClass('in');
}
// --------------------------	
//	Accordion (FAQ)
// --------------------------	
function toggleIcon(e)
{
    $(e.target).prev('.panel-heading').find('.panel-title a').toggleClass('active').find('i.fa').toggleClass('fa-plus-square fa-minus-square');
}
$('.panel').on('hidden.bs.collapse', toggleIcon);
$('.panel').on('shown.bs.collapse', toggleIcon);