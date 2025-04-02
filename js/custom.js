// Custom Scripts

window.onload = function () {
    "use strict";

    // Smooth scrolling for anchor links using scrollIntoView
    document.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                const target = document.querySelector(this.hash);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth', // Enables smooth scrolling
                        block: 'start' // Aligns the target to the top of the viewport
                    });

                    // // Optional: Update the URL without triggering a reload
                    // if (history.pushState && window.location.hash !== this.hash) {
                    //     history.pushState(null, null, this.hash);
                    // }
                }
            }
        });
    });

    // Initialize carousel
    // Initialize Slick Only When Elements Exist
    if ($('.hero-carousel').length) {
        $('.hero-carousel').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            arrows: false,
            dots: false,
            swipeToSlide: true,
            useCSS: true,
            useTransform: true,
            lazyLoad: 'progressive'
        });
    }

    // $('.hero-carousel').slick({
    //     infinite: true,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 4000,
    //     arrows: false,
    //     dots: false,
    //     swipeToSlide: true,
    //     useCSS: true,
    //     useTransform: true,
    //     lazyLoad: 'progressive',
    //     centerMode: true,
    //     centerPadding: '0px'
    // });
};