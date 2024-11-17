(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Canvas Menu
    $(".canvas-open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".canvas-close, .offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    // Search model
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    //Masonary
    $('.gallery').masonry({
        itemSelector: '.gs-item',
        columnWidth: '.grid-sizer',
        gutter: 10
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Carousel Slider
    --------------------*/
    var hero_s = $(".hs-slider");
    hero_s.owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: false,
        onInitialize : function(element){
            hero_s.children().sort(function(){
                return Math.round(Math.random()) - 0.5;
            }).each(function(){
                $(this).appendTo(hero_s);
            });
        },
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*------------------
        Team Slider
    --------------------*/
    $(".ts-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            320: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            }
        }
    });

    /*------------------
        Testimonial Slider
    --------------------*/
    $(".ts_slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*------------------
        Image Popup
    --------------------*/
    $('.image-popup').magnificPopup({
        type: 'image'
    });

    /*------------------
        Video Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        Barfiller
    --------------------*/
    $('#bar1').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });
    $('#bar2').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });
    $('#bar3').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });

    $('.table-controls ul li').on('click', function () {
        var tsfilter = $(this).data('tsfilter');
        $('.table-controls ul li').removeClass('active');
        $(this).addClass('active');

        if (tsfilter == 'all') {
            $('.class-timetable').removeClass('filtering');
            $('.ts-meta').removeClass('show');
        } else {
            $('.class-timetable').addClass('filtering');
        }
        $('.ts-meta').each(function () {
            $(this).removeClass('show');
            if ($(this).data('tsmeta') == tsfilter) {
                $(this).addClass('show');
            }
        });
    });

})(jQuery);

document.addEventListener("DOMContentLoaded", () => {
    const lazyVideos = document.querySelectorAll(".lazy-video");
    const lazyImages = document.querySelectorAll(".lazy-image");

    const observerOptions = {
        root: null,       // Uses the viewport as root
        threshold: 0.1,   // Trigger when 10% of the element is in view
    };

    const onIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Attempt to find the spinner in the parent container
                const spinner = entry.target.parentNode.querySelector('.spinner'); 
                
                // Proceed only if the spinner is found
                if (spinner) {
                    if (entry.target.tagName === "VIDEO") {
                        const video = entry.target;
                        spinner.style.display = "block"; // Show the spinner
                        video.style.display = "block"; // Show the spinner
                        video.src = video.dataset.src;
                        video.load();   // Ensure the video loads

                        video.addEventListener("loadeddata", () => {
                            video.play(); // Autoplay when fully loaded
                            spinner.style.display = "none"; // Hide the spinner
                            video.classList.add("fade-in"); // Add fade-in class
                        });

                    } else {
                        const imageDiv = entry.target;
                        const src = imageDiv.dataset.src;
                        spinner.style.display = "block"; // Show the spinner
                        imageDiv.style.backgroundImage = `url(${src})`;
                        const img = new Image(); // Create a new Image object to preload
                        img.src = src; // Set the source to trigger loading

                        img.onload = () => {
                            spinner.style.display = "none"; // Hide the spinner when loaded
                            imageDiv.classList.add("fade-in"); // Add fade-in class
                        };
                    }
                    observer.unobserve(entry.target); // Stop observing once loaded
                } else {
                    console.warn('Spinner not found for:', entry.target);
                }
            }
        });
    };

    const observer = new IntersectionObserver(onIntersection, observerOptions);

    lazyVideos.forEach(video => observer.observe(video));
    lazyImages.forEach(image => observer.observe(image));
});
