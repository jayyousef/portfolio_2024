(function ($) {
  'use strict';

  /*
  | 1. Preloader
  | 2. Mobile Menu
  | 3. Sticky Header
  | 4. Dynamic Background
  | 5. Swiper Initialize
  | 6. Modal Video
  | 7. Parallax
  | 8. Scroll Up
  | 9. Portfolio Section
  | 10. Circle Button Animation
  | 11. Dynamic contact form
  | 12. particles
  | 13. Random Portfolio
  | 14. Cursor Animation
  */

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on('load', function () {
    preloader();
  });

  $(function () {
    mainNav();
    stickyHeader();
    dynamicBackground();
    randomPortfolio();
    swiperInit();
    modalVideo();
    parallaxEffect();
    scrollUp();
    portfolioSection();
    particles();
    if ($.exists('.wow')) {
      new WOW().init();
    }
  });

  $(window).on('scroll', function () {
    parallaxEffect();
  });

  /*--------------------------------------------------------------
    1. Preloader
  --------------------------------------------------------------*/
  function preloader() {
    const width = 100;
    const time = 1000;
    const percentageSelect = $('#cs_preloader_precent');
    const start = 0;
    const end = 100;
    const durataion = time + 0;

    $('.cs_preloader_loadbar').animate(
      {
        width: width + '%',
      },
      time,
    );

    animateValue(percentageSelect, start, end, durataion);
    function animateValue(id, start, end, duration) {
      let range = end - start;
      let current = start;
      let increment = end > start ? 1 : -1;
      let stepTime = Math.abs(Math.floor(duration / range));
      let obj = $(id);

      let timer = setInterval(function () {
        current += increment;
        $(obj).text(current);
        if (current == end) {
          clearInterval(timer);
        }
      }, stepTime);
    }

    setTimeout(function () {
      $('.cs_preloader_loadbar').append(
        '<span class="cs_preloader_hold_progress_bar"></span>',
      );
      gsap.to($('.cs_preloader_hold_progress_bar'), {
        duration: 0.3,
        force3D: true,
        width: '100%',
        delay: 0,
        ease: Power2.easeOut,
        onComplete: function () {
          $('body').waitForImages({
            finished: function () {
              gsap.to($('.cs_preloader_wrap'), {
                duration: 1,
                force3D: true,
                yPercent: -101,
                delay: 0.6,
                ease: Power2.easeInOut,
              });
              gsap.set($('.cs_preloader_wrap'), {
                visibility: 'hidden',
                delay: 1.7,
                opacity: 0,
              });
            },
            waitForAll: true,
          });
        },
      });
    }, time);
  }

  /*--------------------------------------------------------------
    2. Mobile Menu
  --------------------------------------------------------------*/
  function mainNav() {
    $('.cs_nav').append('<span class="cs_menu_toggle"><span></span></span>');
    $('.menu-item-has-children').append(
      '<span class="cs_munu_dropdown_toggle"><span></span></span>',
    );
    $('.cs_menu_toggle').on('click', function () {
      $(this)
        .toggleClass('cs_toggle_active')
        .siblings('.cs_nav_list')
        .toggleClass('cs_active');
    });
    $('.cs_menu_toggle')
      .parents('body')
      .find('.cs_side_header')
      .addClass('cs_has_main_nav');
    $('.cs_menu_toggle')
      .parents('body')
      .find('.cs_toolbox')
      .addClass('cs_has_main_nav');
    $('.cs_munu_dropdown_toggle').on('click', function () {
      $(this).toggleClass('active').siblings('ul').slideToggle();
      $(this).parent().toggleClass('active');
    });

    // Mega Menu
    // $('.cs_mega_wrapper>li>a').removeAttr('href');

    // Side Nav
    $('.cs_icon_btn').on('click', function () {
      $('.cs_side_header').addClass('active');
    });
    $('.cs_close, .cs_side_header_overlay').on('click', function () {
      $('.cs_side_header').removeClass('active');
    });
    //  Menu Text Split
    $('.cs_animo_links > li > a').each(function () {
      let xxx = $(this).html().split('').join('</span><span>');
      $(this).html(`<span class="cs_animo_text"><span>${xxx}</span></span>`);
    });
  }

  /*--------------------------------------------------------------
    3. Sticky Header
  --------------------------------------------------------------*/
  function stickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $('.cs_sticky_header');
    var headerHeight = $header.outerHeight() + 30;

    $window.scroll(function () {
      var windowTop = $window.scrollTop();

      if (windowTop >= headerHeight) {
        $header.addClass('cs_gescout_sticky');
      } else {
        $header.removeClass('cs_gescout_sticky');
        $header.removeClass('cs_gescout_show');
      }

      if ($header.hasClass('cs_gescout_sticky')) {
        if (windowTop < lastScrollTop) {
          $header.addClass('cs_gescout_show');
        } else {
          $header.removeClass('cs_gescout_show');
        }
      }

      lastScrollTop = windowTop;
    });
  }

  /*--------------------------------------------------------------
    4. Dynamic Background
  --------------------------------------------------------------*/
  function dynamicBackground() {
    $('[data-src]').each(function () {
      var src = $(this).attr('data-src');
      $(this).css({
        'background-image': 'url(' + src + ')',
      });
    });
  }

  /*--------------------------------------------------------------
    5. Swiper Initialize
  --------------------------------------------------------------*/
  function swiperInit() {
    if ($.exists('.cs_slider_1')) {
      var swiper = new Swiper('.cs_slider_1', {
        loop: true,
        speed: 1000,
        autoplay: true,
        pagination: {
          el: '.cs_pagination',
          clickable: true,
        },
      });
    }
    if ($.exists('.cs_slider_2')) {
      var swiper2 = new Swiper('.cs_slider_2', {
        loop: true,
        speed: 1000,
        navigation: {
          nextEl: '.cs_swiper_next',
          prevEl: '.cs_swiper_prev',
        },
      });
    }
    if ($.exists('.cs_slider_3')) {
      var swiper3 = new Swiper('.cs_slider_3', {
        loop: true,
        autoplay: true,
        speed: 1000,
        slidesPerView: 'auto',
        spaceBetween: 25,
        pagination: false,
      });
    }
    if ($.exists('.cs_slider_4')) {
      var swiper4 = new Swiper('.cs_slider_4', {
        loop: true,
        speed: 1000,
        effect: 'fade',
        mousewheel: true,
        navigation: {
          nextEl: '.cs_swiper_next',
          prevEl: '.cs_swiper_prev',
        },
      });
      $('.cs_swiper_next').on('click', function () {
        $(this).addClass('cs_animated_class');
        setTimeout(function () {
          $('.cs_swiper_next').removeClass('cs_animated_class');
        }, 1000);
      });
      $('.cs_swiper_prev').on('click', function () {
        $(this).addClass('cs_animated_class');
        setTimeout(function () {
          $('.cs_swiper_prev').removeClass('cs_animated_class');
        }, 1000);
      });
    }
    if ($.exists('.cs_slider_5')) {
      var menu = [
        '01. Color splash with motion pulse',
        '02. 3D objects for background',
        '03. Rendering car with full moon',
        '04. Round objects illustration',
        '05. Two cylinder pipe bar',
        '06. Abstract black & white motion',
      ];
      var swiper6 = new Swiper('.cs_slider_5', {
        // If we need pagination
        pagination: {
          el: '.cs_swiper_navigation',
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className}"><span class="cs_swiper_bullet_text">${menu[index]}</span></span>`;
          },
        },
        direction: 'vertical',
        mousewheel: true,
        loop: true,
        speed: 1000,
      });
    }
    if ($.exists('.cs_slider_6')) {
      var swiper7 = new Swiper('.cs_slider_6', {
        loop: true,
        autoplay: false,
        mousewheel: true,
        speed: 800,
        slidesPerView: 'auto',
        spaceBetween: 25,
        pagination: {
          el: '.cs_pagination',
          clickable: true,
        },
      });
    }
  }

  /*--------------------------------------------------------------
    6. Modal Video
  --------------------------------------------------------------*/
  function modalVideo() {
    if ($.exists('.cs_video_open')) {
      $('body').append(`
        <div class="cs_video_popup">
          <div class="cs_video_popup_overlay"></div>
          <div class="cs_video_popup_content">
            <div class="cs_video_popup_layer"></div>
            <div class="cs_video_popup_container">
              <div class="cs_video_popup_align">
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe class="embed-responsive-item" src="about:blank"></iframe>
                </div>
              </div>
              <div class="cs_video_popup_close"></div>
            </div>
          </div>
        </div>
      `);
      $(document).on('click', '.cs_video_open', function (e) {
        e.preventDefault();
        var video = $(this).attr('href');
        video = video.split('?v=')[1].trim();
        $('.cs_video_popup_container iframe').attr(
          'src',
          `https://www.youtube.com/embed/${video}`,
        );
        $('.cs_video_popup').addClass('active');
      });
      $('.cs_video_popup_close, .cs_video_popup_layer').on(
        'click',
        function (e) {
          $('.cs_video_popup').removeClass('active');
          $('html').removeClass('overflow-hidden');
          $('.cs_video_popup_container iframe').attr('src', 'about:blank');
          e.preventDefault();
        },
      );
    }
  }

  /*--------------------------------------------------------------
    7. Parallax
  --------------------------------------------------------------*/
  function parallaxEffect() {
    $('.cs_parallax').each(function () {
      var windowScroll = $(document).scrollTop(),
        windowHeight = $(window).height(),
        barOffset = $(this).offset().top,
        barHeight = $(this).height(),
        barScrollAtZero = windowScroll - barOffset + windowHeight,
        barHeightWindowHeight = windowScroll + windowHeight,
        barScrollUp = barOffset <= windowScroll + windowHeight,
        barSctollDown = barOffset + barHeight >= windowScroll;

      if (barSctollDown && barScrollUp) {
        var calculadedHeight = barHeightWindowHeight - barOffset;
        var mediumEffectPixel = barScrollAtZero / 7;
        var miniEffectPixel = calculadedHeight / 10;
        var miniEffectPixel2 = calculadedHeight / 3;
        var miniEffectPixel3 = calculadedHeight / 6;
        var miniEffectPixel4 = barScrollAtZero / 6;
        // console.log(windowHeight / 2);
        $(this)
          .find('.cs_to_left')
          .css('transform', `translateX(-${miniEffectPixel}px)`);
        $(this)
          .find('.cs_to_right')
          .css('transform', `translateX(${miniEffectPixel}px)`);
        $(this)
          .find('.cs_to_up')
          .css('transform', `translateY(-${miniEffectPixel}px)`);
        $(this)
          .find('.cs_to_up_2')
          .css('transform', `translateY(-${miniEffectPixel2}px)`);
        $(this)
          .find('.cs_to_up_3')
          .css('transform', `translateY(-${miniEffectPixel3}px)`);
        $(this)
          .find('.cs_to_down')
          .css('transform', `translateY(${miniEffectPixel}px)`);
        $(this)
          .find('.cs_to_rotate')
          .css('transform', `rotate(${miniEffectPixel}deg)`);
        $(this)
          .find('.cs_parallax_bg')
          .css('background-position', `center -${mediumEffectPixel}px`);
      }
    });
  }

  /*--------------------------------------------------------------
    8. Scroll Up
  --------------------------------------------------------------*/
  function scrollUp() {
    $('.cs_scrollup').on('click', function (e) {
      e.preventDefault();
      $('html,body').animate(
        {
          scrollTop: 0,
        },
        0,
      );
    });
  }
  /*--------------------------------------------------------------
    9. Portfolio Section
  --------------------------------------------------------------*/
  function portfolioSection() {
    $('.cs_portfolio.cs_style_1 .cs_btn').hover(
      function () {
        $(this)
          .parents('.cs_portfolio')
          .find('.cs_portfolio_img')
          .addClass('active');
      },
      function () {
        $(this)
          .parents('.cs_portfolio')
          .find('.cs_portfolio_img')
          .removeClass('active');
      },
    );
  }

  /*--------------------------------------------------------------
    10. Circle Button Animation
  --------------------------------------------------------------*/
  $('.cs_round_btn').on('mouseenter', function (e) {
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;

    $(this).find('span').css({
      top: y,
      left: x,
    });
  });

  $('.cs_round_btn').on('mouseout', function (e) {
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;

    $(this).find('span').css({
      top: y,
      left: x,
    });
  });

  // Dancing Animation
  const allBtns = gsap.utils.toArray('.cs_round_btn_wrap');

  if (allBtns.length > 0) {
    var allBtn = gsap.utils.toArray('.cs_round_btn_wrap');
    console.log(allBtn);
  } else {
    var allBtn = gsap.utils.toArray('.cs_round_btn_wrap');
  }
  const allBtnCirlce = gsap.utils.toArray('.cs_round_btn');
  allBtn.forEach((btn, i) => {
    $(btn).mousemove(function (e) {
      callParallax(e);
    });
    function callParallax(e) {
      parallaxIt(e, allBtnCirlce[i], 80);
    }

    function parallaxIt(e, target, movement) {
      var $this = $(btn);
      var relX = e.pageX - $this.offset().left;
      var relY = e.pageY - $this.offset().top;

      gsap.to(target, 0.5, {
        x: ((relX - $this.width() / 2) / $this.width()) * movement,
        y: ((relY - $this.height() / 2) / $this.height()) * movement,
        ease: Power2.easeOut,
      });
    }
    $(btn).mouseleave(function (e) {
      gsap.to(allBtnCirlce[i], 0.5, {
        x: 0,
        y: 0,
        ease: Power2.easeOut,
      });
    });
  });

  /*--------------------------------------------------------------
    11. Dynamic contact form
  --------------------------------------------------------------*/
  if ($.exists('#cs_form')) {
    const form = document.getElementById('cs_form');
    const result = document.getElementById('cs_result');

    form.addEventListener('submit', function (e) {
      const formData = new FormData(form);
      e.preventDefault();
      var object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      // var json = JSON.stringify(object);
      result.innerHTML = 'Please wait...';
      console.log(object);
      fetch('https://formsubmit.co/620f57d2e5a3f7507e8228887ebecb48')
        .then(async response => {
          let json = await response.json();
          if (response.status == 200) {
            result.innerHTML = json.message;
          } else {
            console.log(response);
            result.innerHTML = json.message;
          }
        })
        .catch(error => {
          console.log(error);
          result.innerHTML = 'Form Submitted!';
        })
        .then(function () {
          form.reset();
          setTimeout(() => {
            result.style.display = 'none';
          }, 2500);
        });
    });
  }

  /*--------------------------------------------------------------
    12. particles
  --------------------------------------------------------------*/
  function particles() {
    if ($.exists('#particles-js')) {
      var particalColor = $('#particles-js').attr('data-color');
      particlesJS('particles-js', {
        particles: {
          number: {
            value: 120,
            density: {
              enable: true,
              value_area: 789.1476416322727,
            },
          },
          color: {
            value: particalColor,
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000',
            },
            polygon: {
              nb_sides: 5,
            },
            image: {
              src: 'img/github.svg',
              width: 100,
              height: 100,
            },
          },
          opacity: {
            value: 0.4,
            random: false,
            anim: {
              enable: true,
              speed: 0.6,
              opacity_min: 0,
              sync: false,
            },
          },
          size: {
            value: 2,
            random: true,
            anim: {
              enable: true,
              speed: 5,
              size_min: 0,
              sync: false,
            },
          },
          line_linked: {
            enable: false,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'bubble',
            },
            onclick: {
              enable: true,
              mode: 'push',
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 83.91608391608392,
              size: 1,
              duration: 3,
              opacity: 1,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      });
    }
  }

  /*--------------------------------------------------------------
    13. Random Portfolio
  --------------------------------------------------------------*/
  // Random Portfolio Hover Effect
  function randomPortfolio() {
    $('.cs_randomness_wrap .cs_portfolio').hover(
      function () {
        $(this)
          .parents('.cs_randomness_wrap')
          .find('.cs_section_heading')
          .addClass('active');
      },
      function () {
        $(this)
          .parents('.cs_randomness_wrap')
          .find('.cs_section_heading')
          .removeClass('active');
      },
    );
  }

  // Random Portfolio Smooth scroll
  if ($.exists('#cs_smooth_wrapper')) {
    let skewSetter = gsap.quickTo('.cs_portfolio_in', 'skewY'),
      clamp = gsap.utils.clamp(-5, 5);
    const scrolinglSmooth = ScrollSmoother.create({
      smooth: 1.35,
      smoothTouch: false,
      normalizeScroll: false,
      ignoreMobileResize: true,
      onUpdate: self => skewSetter(clamp(self.getVelocity() / -80)),
      onStop: () => skewSetter(0),
    });
  }

  /*--------------------------------------------------------------
    14. Cursor Animation
  --------------------------------------------------------------*/
  $(function () {
    $('body').append('<span class="cs_cursor_lg d"></span>');
    $('body').append('<span class="cs_cursor_sm"></span>');
    $(
      '.cs_text_btn, .cs_site_header a, .cs_down_btn, .cs_social_btns a, .cs_menu_widget',
    ).on('mouseenter', function () {
      $('.cs_cursor_lg').addClass('opacity-0');
      $('.cs_cursor_sm').addClass('opacity-0');
    });
    $(
      '.cs_text_btn, .cs_site_header a, .cs_down_btn, .cs_social_btns a, .cs_menu_widget',
    ).on('mouseleave', function () {
      $('.cs_cursor_lg').removeClass('opacity-0');
      $('.cs_cursor_sm').removeClass('opacity-0');
    });
  });
  function cursorMovingAnimation(event) {
    try {
      const timing = gsap.timeline({
        defaults: {
          x: event.clientX,
          y: event.clientY,
        },
      });

      timing
        .to('.cs_cursor_lg', {
          ease: 'power2.out',
        })
        .to(
          '.cs_cursor_sm',
          {
            ease: 'power2.out',
          },
          '-=0.4',
        );
    } catch (err) {
      console.log(err);
    }
  }
  document.addEventListener('mousemove', cursorMovingAnimation);
})(jQuery); // End of use strict
