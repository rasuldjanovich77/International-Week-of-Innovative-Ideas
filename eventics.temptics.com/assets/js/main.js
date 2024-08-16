document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    // arists slider 
    new Swiper(".et-3-artists-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        watchSlidesProgress: true,
        navigation: {
            prevEl: ".et-artists-slider-nav .prev",
            nextEl: ".et-artists-slider-nav .next",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    });
    // testimonial slider 
    new Swiper(".et-3-testimonial-slider", {
        slidesPerView: 2,
        spaceBetween: 30,
        watchSlidesProgress: true,
        navigation: {
            prevEl: ".et-testimonial-slider-nav .prev",
            nextEl: ".et-testimonial-slider-nav .next",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {
                spaceBetween: 30,
            }
        }
    });

    // schedule tab js
    const tabButtons = document.querySelectorAll(".tab-nav");
    const tabs = document.querySelectorAll(".et-tab");

    if (tabButtons) {
        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                const tabId = button.getAttribute("data-tab");

                tabs.forEach(tab => {
                    if (tab.id === tabId) {
                        tab.classList.add("active");
                    } else {
                        tab.classList.remove("active");
                    }
                });

                tabButtons.forEach(btn => {
                    btn.classList.remove("active");
                });
                button.classList.add("active");
            });
        });
    };

    // ticker
    if (document.querySelector(".et-schedule-ticker")) {
        new Splide('.et-schedule-ticker', {
            arrows: false,
            pagination: false,
            type: 'loop',
            drag: 'free',
            focus: 'center',
            perPage: 2,
            autoWidth: true,
            gap: 60,
            autoScroll: {
                speed: 2,
            },
        }).mount(window.splide.Extensions);
    }


    // header search
    const etHeaderSearch = document.querySelector(".et-header-search");
    const etHeaderSearchBtn = document.querySelector(".et-header-search-open-btn");
    if (etHeaderSearchBtn) {
        etHeaderSearchBtn.addEventListener("click", () => {
            etHeaderSearch.classList.toggle("active");
        });
    }

    if (etHeaderSearch) {
        document.addEventListener("click", (e) => {
            if (!etHeaderSearch.contains(e.target)) {
                etHeaderSearch.classList.remove("active");
            }
        });
    }

    // header location dropdown
    new SlimSelect({
        select: '#et-header-location-dropdown',
        settings: {
            showSearch: false,
        }
    });


    // SIDEBAR JS START
    const etSidebar = document.querySelector(".et-sidebar");
    const etSidebarOpenBtn = document.querySelector(".et-header-sidebar-open-btn");
    const etSidebarCloseBtn = document.querySelector(".et-sidebar-close-btn");
    const etOverlay = document.querySelector(".et-overlay");

    if (etSidebarOpenBtn) {
        etSidebarOpenBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            etSidebar.classList.add("active");
            etOverlay.classList.add("active");
        });
    }
    etSidebarCloseBtn.addEventListener("click", () => {
        etSidebar.classList.remove("active");
        etOverlay.classList.remove("active");
    });

    document.addEventListener("click", (e) => {
        if (!etSidebar.contains(e.target)) {
            etSidebar.classList.remove("active");
            etOverlay.classList.remove("active");
        }
    });
    // SIDEBAR JS END

    // MOBILE MENU SIDEBAR
    const etMobileMenuOpenBtn = document.querySelector(".et-mobile-menu-open-btn");
    const etMobileMenuContent = document.querySelector(".to-go-to-sidebar-in-mobile");
    const etMobileMenuContainer = document.querySelector(".et-header-nav-in-mobile");
    const etHeaderNav = document.querySelectorAll(".et-header-nav li");
    const etHeaderNavContainer = document.querySelector(".et-header-right");

    if (window.innerWidth < 992) {
        etMobileMenuContainer.appendChild(etMobileMenuContent);
        etHeaderNav.forEach(etHeaderNavItem => {
            etHeaderNavItem.addEventListener("click", () => {
                etHeaderNavItem.classList.toggle("active");
            });
        });
    };

    window.addEventListener("resize", () => {
        if (window.innerWidth < 992) {
            etMobileMenuContainer.appendChild(etMobileMenuContent);
        }
        else if (window.innerWidth > 992) {
            etHeaderNavContainer.appendChild(etMobileMenuContent);
        };
    });
    etMobileMenuOpenBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        etSidebar.classList.add("active");
        etOverlay.classList.add("active");
    });
    // MOBILE MENU SIDEBAR

    // FIXED HEADER =====
    window.addEventListener("scroll", () => {
        const toFixHeaders = document.querySelectorAll(".to-be-fixed");
        toFixHeaders.forEach(toFixHeader => {
            if (window.scrollY > 100) {
                toFixHeader.classList.add("et-sticky");
            } else {
                toFixHeader.classList.remove("et-sticky");
            }
        })
    });
    //===== FIXED HEADER

    // banner slider 
    new Swiper(".et-banner-slider", {
        slidesPerView: 1,
        loop: true,
        autoplay: true,
        pagination: {
            el: ".et-banner-slider-dots",
            clickable: true,
        },
        on: {
            slideChange: function () {
                textAnimate(this.el);
            }
        }
    });

    // smooth scroll
    const smoothScrollContainer = document.querySelector("main");
    if (window.innerWidth > 991) {
        const lenis = new Lenis();

        lenis.on('scroll', (e) => {
            wrapper: smoothScrollContainer
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf);
    }


    // text animation
    function textAnimate(sliderElement) {
        const textsToAnimate = sliderElement.querySelectorAll(".anim-text");
        const options = {
            root: null,
            rootMargin: '0px 0px -5% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animate = new SplitType(entry.target, { types: 'words,chars' });
                    gsap.from(animate.chars, {
                        opacity: 0,
                        x: "50%",
                        ease: "elastic.out(0.6, 0.3)",
                        duration: 3,
                        stagger: { amount: 0.8 }
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        textsToAnimate.forEach(textToAnimate => {
            observer.observe(textToAnimate);
        });
    }

    textAnimate(document);



    // scroll animation
    gsap.registerPlugin(ScrollTrigger);
    // about section img slide on scroll
    gsap.matchMedia().add("(min-width: 480px)", () => {
        gsap.to(".et-about-floating-img", {
            duration: 70,
            y: 230,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".et-about-floating-img",
                start: "top center",
                end: "top 100px",
                scrub: true,
                id: "scrub"
            }
        });
    });
    gsap.matchMedia().add("(max-width: 479px)", () => {
        gsap.to(".et-about-floating-img", {
            duration: 70,
            y: 80,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".et-about-floating-img",
                start: "top center",
                end: "top 100px",
                scrub: true,
                id: "scrub"
            }
        });
    });


    // slide up on scroll
    function elSlideUpOnScroll(el) {
        const options = {
            root: null,
            rootMargin: '0px 0px 0px 0px', // Start value of ScrollTrigger as rootMargin
            threshold: 0
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.from(el, {
                        y: 50,
                    })
                    gsap.to(el, {
                        duration: 2,
                        y: 0,
                        opacity: 1,
                        ease: "power3.out"
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        observer.observe(el);
    }

    const elsToSlideUp = document.querySelectorAll(".rev-slide-up");
    elsToSlideUp.forEach(elToSlideUp => {
        elSlideUpOnScroll(elToSlideUp);
    });


    // speakers slider
    new Swiper(".et-speakers-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        watchSlidesProgress: true,
        navigation: {
            prevEl: ".et-speakers-slider-nav .prev",
            nextEl: ".et-speakers-slider-nav .next",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    });


    // testimonial slider
    new Swiper(".et-testimonial-slider", {
        slidesPerView: 4,
        spaceBetween: 20,
        watchSlidesProgress: true,
        centeredSlides: true,
        loop: true,
        autoplay: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 1.5,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 2.4,
            },
            1200: {
                slidesPerView: 2.8,
                spaceBetween: 25,
            },
            1400: {
                slidesPerView: 3.2,
                spaceBetween: 30,
            },
            1600: {
                spaceBetween: 30,
                slidesPerView: 4,
            }
        }
    });

    new Swiper(".et-events-slider", {
        slidesPerView: 1,
        loop: true,
        navigation: {
            prevEl: ".et-events-slider-nav .prev",
            nextEl: ".et-events-slider-nav .next"
        }
    });


    // index-2 testimonial slider 
    new Swiper(".et-2-testimonial-slider", {
        slidesPerView: 2.1,
        spaceBetween: 30,
        loop: true,
        autoplay: true,
        watchSlidesProgress: true,
        navigation: {
            prevEl: ".et-testimonial-slider-nav .prev",
            nextEl: ".et-testimonial-slider-nav .next",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {
                spaceBetween: 30,
            }
        }
    });

    // speakers slider
    new Swiper(".et-2-blogs-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        watchSlidesProgress: true,
        loop: true,
        navigation: {
            prevEl: ".et-blogs-slider-nav .prev",
            nextEl: ".et-blogs-slider-nav .next",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    });

    // about history slider
    const etHistoryTimelineSlider = new Swiper(".et-history-timeline-slider", {
        slidesPerView: "auto",
        spaceBetween: 52,
        breakpoints: {
            0: {
                spaceBetween: 32,
            },
            768: {
                spaceBetween: 52,
            }
        }
    });
    new Swiper(".et-history-slider", {
        thumbs: {
            swiper: etHistoryTimelineSlider,
        },
    });

    new Swiper(".et-3-partners-slider", {
        slidesPerView: 2,
        spaceBetween: 25,
        breakpoints: {
            480: {
                slidesPerView: 3,
                spaceBetween: 25,
            },
            768: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 30,
            },
            1400: {
                slidesPerView: 5,
                spaceBetween: 60,
            },
            1600: {
                slidesPerView: 5,
                spaceBetween: 100,
            }
        }
    });

    new Swiper(".et-3-event-slider", {
        slidesPerView: "auto",
        // slidesPerView: 3,
        spaceBetween: 20,
        // slideToClickedSlide: true,
        loop: true,
    });

    // index 3 team slider
    new Swiper(".et-3-team-slider", {
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        watchSlidesProgress: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
            1600: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });

    // INDEX-3 TESTIMONIAL SLIDER
    const et3TestimonialImgSlider = new Swiper(".et-3-testimonial-img-slider", {
        slidesPerView: 3,
        spaceBetween: 15,
        loop: true,
    });
    new Swiper(".et-3-testimonial-slider", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        thumbs: {
            swiper: et3TestimonialImgSlider,
        },
        navigation: {
            prevEl: ".et-3-testimonial-slider-nav .prev",
            nextEl: ".et-3-testimonial-slider-nav .next",
        }
    });


    const et3CalnderEvents = document.querySelectorAll(".et-3-cal-event");
    et3CalnderEvents.forEach(et3CalnderEvent => {
        et3CalnderEvent.addEventListener("mouseover", (e) => {
            et3CalnderEvents.forEach(et3CalnderEvent => {
                et3CalnderEvent.classList.remove("active");
            });
            et3CalnderEvent.classList.add("active");
        });
    });
});