; (function ($) {
    "use strict"

    /*-------------------------------------------------------------------------------
	  Wow Js
    -------------------------------------------------------------------------------*/
    new WOW().init();

    /* ---------------------------------------------
        scroll body to 0px on click
     --------------------------------------------- */
     $('#back-top a').on("click", function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });


    var nav_offset_top = $('header').height();
    /*-------------------------------------------------------------------------------
	  Navbar 
	-------------------------------------------------------------------------------*/

    //* Navbar Fixed 
    $('#back-top').hide();
    function navbarFixed() {
        if ($('.header_area').length) {
            $(window).scroll(function () {
                var scroll = $(window).scrollTop();
                if (scroll >= nav_offset_top) {
                    $(".header_area").addClass("navbar_fixed");
                    $('#back-top').fadeIn(500);
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                    $('#back-top').fadeOut(500);
                }
            });
        };
    };
    navbarFixed();

    // Menu Bar Seach Box
    $('.menu-form').hide();
    $('.search-icon').on('click', function () {
        $('.menu-form').fadeToggle(750);
        $(this).toggleClass("three-side-b");
    });

    // Search icon
    // $('.search-icon').on("click", function () {
    //     if ($(window).width() > 991 && $(window).width() < 1441) {
    //         $('.menu_nav').fadeToggle(750);
    //     }
    // });


    /*----------------------------------------------------*/
    /*  Owl Carousel js
    /*----------------------------------------------------*/
    if ($('#home-owl').length) {
        $('#home-owl').owlCarousel({
            lazyLoad: true,
            stagePadding: 0,
            items: 1,
            nav: false,
            dots: true,
            loop: true,
            margin: 0,
            singleItem: false,
            autoplay: 2500,
            slideSpeed: 400,
            paginationSpeed: 500,
            smartSpeed: 800,
            responsiveClass: true,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut'
        });
    }


    if ($('#travel_cat').length) {
        $('#travel_cat').owlCarousel({
            stagePadding: 100,
            items: 3,
            nav: false,
            dots: true,
            loop: true,
            margin: 30,
            singleItem: false,
            autoplay: 2500,
            slideSpeed: 400,
            paginationSpeed: 500,
            smartSpeed: 800,
            responsiveClass: true,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            responsive: {
                0: {
                    items: 1,
                    stagePadding: 30,
                },
                768: {
                    items: 2
                },
                1280: {
                    items: 3
                }
            }
        });
    }

    /*----------------------------------------------------*/
    /*  MailChimp Slider
    /*----------------------------------------------------*/
    function mailChimp() {
        $('#mc_embed_signup').find('form').ajaxChimp();
    }
    mailChimp();

    $('select').niceSelect();

    /*----------------------------------------------------*/
    /*  Simple LightBox js
    /*----------------------------------------------------*/
    $('.imageGallery1 .light').simpleLightbox();


    /*----------------------------------------------------*/
    /*  Google map js
    /*----------------------------------------------------*/

   if (document.getElementById("mapBox")) {
    google.maps.event.addDomListener(window, 'load', init);

    function init() {
        var mapOptions = {
            zoom: 11,
            center: new google.maps.LatLng(40.6700, -73.9400), // New York
            styles: [{
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e9e9e9"
                }, {
                    "lightness": 17
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f5f5"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 17
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 29
                }, {
                    "weight": 0.2
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 18
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 16
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f5f5"
                }, {
                    "lightness": 21
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dedede"
                }, {
                    "lightness": 21
                }]
            }, {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#ffffff"
                }, {
                    "lightness": 16
                }]
            }, {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "saturation": 36
                }, {
                    "color": "#333333"
                }, {
                    "lightness": 40
                }]
            }, {
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f2f2f2"
                }, {
                    "lightness": 19
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#fefefe"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#fefefe"
                }, {
                    "lightness": 17
                }, {
                    "weight": 1.2
                }]
            }]
        };
        var mapElement = document.getElementById('mapBox');
        var map = new google.maps.Map(mapElement, mapOptions);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(40.6700, -73.9400),
            map: map,
            title: 'Snazzy!'
        });
    }
}


})(jQuery)