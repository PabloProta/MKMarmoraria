(function($) {
    "use strict";

    const loadImages = (url, containerId, itemsPerSlide = 8) => {
        fetch(url)
            .then(response => response.json())
            .then(marmores => {
                const container = document.getElementById(containerId);
                let slideHTML = '';
                let itemsInSlide = 0;
    
                marmores.forEach((item, index) => {
                    // Inicie um novo slide se necessário
                    if (itemsInSlide === 0) {
                        slideHTML += '<div class="d-flex justify-content-around">';
                    }
    
                    // Adicione o item ao slide
                    slideHTML += `
                        <div class="p-2">
                            <div class="wow fadeInUp" data-wow-delay="0.6s">
                                <h4 class="fw-light">${item.title}</h4>
                                <img class="material-item rounded ratio ratio-1x1" src="${item.url}" alt="${item.title}"></img>
                            </div>
                        </div>
                    `;
    
                    itemsInSlide++;
    
                    // Feche o slide se ele estiver cheio ou se este for o último item
                    if (itemsInSlide === itemsPerSlide || index === marmores.length - 1) {
                        slideHTML += '</div>';
                        container.innerHTML += slideHTML;
                        slideHTML = '';
                        itemsInSlide = 0;
                    }
                });
    
                // Inicialize o Slick Slider
                $(document).ready(function(){
                    $('#marmore-container').slick();
                });
            })
            .catch(error => console.error('Error:', error));
    };
    
    loadImages('marmore.json', 'marmore-container');
    
    

// Inicialize o Slick Slider
$(document).ready(function(){
    $('#marmore-container').slick();
});

    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: true,
        prevArrow:"<button type='button' class='slick-prev'><i class='bi bi-arrow-left' aria-hidden='true'></i></button>",
        nextArrow:"<button type='button' class='slick-next'><i class='bi bi-arrow-right' aria-hidden='true'></i></button>"
      });

    // Spinner
    var spinner = function() {
        setTimeout(function() {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function() {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function() {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function() {
        var $videoSrc;
        $('.btn-play').click(function() {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function(e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function(e) {
            $("#video").attr('src', $videoSrc);
        })
    });

 // Testimonials carousel
 $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 25,
    dots: false,
    loop: true,
    nav: true,
    navText: [
        '<i class="bi bi-arrow-left"></i>',
        '<i class="bi bi-arrow-right"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        }
    }
});
})(jQuery);