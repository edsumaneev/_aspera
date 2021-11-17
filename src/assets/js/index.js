require('bootstrap');
require('slick-carousel');
require('hammerjs');

$(function () {
  $('[data-toggle="popover"]').popover();
});

$(document).click(function (e) {
  if (!$(e.target).is('[data-toggle="popover"]')) {
    $('[data-toggle="popover"]').popover("hide");
  }
});

// category filters
if ($(".category").length > 0) {
  $(".category__title--mobile").on("click", function (event) {
    event.preventDefault();
    $(this).toggleClass("active");
    $(".sidebar").toggleClass("active");
  });
}

// orders select
if ($(".orders").length > 0) {
  $("input[type=radio]").on("click", function (e) {
    $("div").removeClass("selected");
    $(this).closest("div").addClass("selected");
  });
}

// hamburger
$('.hamburger').on('click', function (event) {
  event.preventDefault();
  $(this).toggleClass('active');
  $('.nav').toggleClass('active');
  $('body').toggleClass('is-modal');
  $('#overlay').toggleClass('active');
});

$('#overlay, .nav__item').on('click', function (event) {
  if ($(window).innerWidth() < 992) {
    $('.hamburger').removeClass('active');
    $('.nav').removeClass('active');
    $('body').removeClass('is-modal');
    $('#overlay').removeClass('active');
  }
});

$(document).keydown(function (eveent) {
  if (event.keyCode == 27) {
    $('.hamburger').removeClass('active');
    $('.nav').removeClass('active');
    $('body').removeClass('is-modal');
    $('#overlay').removeClass('active');
  }
});

// slick sliders
if ($('.home').length > 0) {
  $(".products__slider").slick({
    slidesToShow: 3,
    infinite: true,
    autoplay: false,
    touchThreshold: 100,
    dots: false,
    prevArrow: $(".products__prev"),
    nextArrow: $(".products__next"),
    responsive: [{
        breakpoint: 1100,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 737,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  $(".samples__slider").slick({
    slidesToShow: 1,
    infinite: true,
    autoplay: false,
    touchThreshold: 100,
    dots: true,
    prevArrow: false,
    nextArrow: false
  });

  $(".slider-header").slick({
    slidesToShow: 1,
    infinite: true,
    autoplay: false,
    touchThreshold: 100,
    dots: false,
    prevArrow: $(".home__prev"),
    nextArrow: $(".home__next")
  });
};

if ($('.catalog').length > 0) {
  $(".catalog__list").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: true,
    autoplay: false,
    touchThreshold: 100,
    dots: false,
    prevArrow: $(".catalog__prev"),
    nextArrow: $(".catalog__next"),
    responsive: [{
      breakpoint: 900,
      settings: {
        slidesToShow: 1
      }
    }, ]
  });
};
// search
$(".header__search").on("click", "button", function (e) {
  if ($(".header__inpsearch").val() == "" || !$("input[type='search']").hasClass("active")) {
    // если текстовое поле пустое или свернуто - не даем форме отправиться и сворачиваем/разворачиваем его
    e.preventDefault();
    e.stopPropagation();
    $("input[type='search']").toggleClass("active");
    $(".header__search").toggleClass("active");
  }
});
// не даем свернуться текстовому полю при клике на нём
$("body").on('click', "input[type='search']", function (e) {
  e.stopPropagation();
});
// сворачиваем поле при клике вне поля
$("html").on("click", function (e) {
  $("input[type='search']").removeClass("active");
  $(".header__search").removeClass("active");
});
// END search
// fixed header
jQuery(function ($) {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 74) {
      $('.header--main').addClass('fixed');
    } else if ($(this).scrollTop() < 74) {
      $('.header--main').removeClass('fixed');
    }
  });
});
// video
$('.video__video').parent().click(function () {
  if ($(this).children(".video__video").get(0).paused) {
    $(this).children(".video__video").get(0).play();
    $(this).children(".video__playpause").fadeOut();
    $(this).children(".video__title").addClass("deactivate");
  } else {
    $(this).children(".video__video").get(0).pause();
    $(this).children(".video__playpause").fadeIn();
    $(this).children(".video__title").removeClass("deactivate");
  }
});
// counter
if ($('.counter').length > 0) {
  $(document).ready(function () {
    $('body').on('click', '.counter__minus, .counter__plus', function () {
      var $row = $(this).closest('.counter');
      var $input = $row.find('.counter__text');
      var step = $row.data('step');
      var val = parseFloat($input.val());
      if ($(this).hasClass('counter__minus')) {
        val -= step;
      } else {
        val += step;
      }
      $input.val(val);
      $input.change();
      return false;
    });
    $('body').on('change', '.counter__text', function () {
      var $input = $(this);
      var $row = $input.closest('.counter');
      var step = $row.data('step');
      var min = parseInt($row.data('min'));
      var max = parseInt($row.data('max'));
      var val = parseFloat($input.val());
      if (isNaN(val)) {
        val = step;
      } else if (min && val < min) {
        val = min;
      } else if (max && val > max) {
        val = max;
      }
      $input.val(val);
    });
  });
};
// END counter
// tabs
// вкладки с содержанием

$(".tabs__content").hide();
$(".tabs__content:first").show();
/* в режиме вкладок */
$(".tabs__header").click(function () {
  $(".tabs__content").hide();
  var activeTab = $(this).attr("rel");
  $("#" + activeTab).fadeIn();
  $(".tabs__header").removeClass("active");
  $(this).addClass("active");
  $(".tabs__accordion").removeClass("d_active");
  $(".tabs__accordion[rel^='" + activeTab + "']").addClass("d_active");
});
/* в режиме аккордеона */
$(".tabs__accordion").click(function () {
  $(".tabs__content").hide();
  var d_activeTab = $(this).attr("rel");
  $("#" + d_activeTab).fadeIn();
  $(".tabs__accordion").removeClass("d_active");
  $(this).addClass("d_active");
  $(".tabs__header").removeClass("active");
  $(".tabs__header[rel^='" + d_activeTab + "']").addClass("active");
});

// timeline https://codepen.io/tutsplus/pen/ZKpNwm
if ($(".timeline").length > 0) {
  (function () {
    // VARIABLES
    const timeline = document.querySelector(".timeline__list"),
      elH = document.querySelectorAll(".timeline__item > div"),
      arrows = document.querySelectorAll(".timeline .arrows .arrow"),
      arrowPrev = document.querySelector(".timeline .arrows .arrow__prev"),
      arrowNext = document.querySelector(".timeline .arrows .arrow__next"),
      firstItem = document.querySelector(".timeline__item:first-child"),
      lastItem = document.querySelector(".timeline__item:last-child"),
      xScrolling = 376,
      disabledClass = "disabled";

    // START
    window.addEventListener("load", init);

    function init() {
      setEqualHeights(elH);
      animateTl(xScrolling, arrows, timeline);
      setSwipeFn(timeline, arrowPrev, arrowNext);
    }

    // SET EQUAL HEIGHTS
    function setEqualHeights(el) {
      let counter = 0;
      for (let i = 0; i < el.length; i++) {
        const singleHeight = el[i].offsetHeight;

        if (counter < singleHeight) {
          counter = singleHeight;
        }
      }

      for (let i = 0; i < el.length; i++) {
        el[i].style.height = `${counter}px`;
      }
    }

    // CHECK IF AN ELEMENT IS IN VIEWPORT
    // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    // SET STATE OF PREV/NEXT ARROWS
    function setBtnState(el, flag = true) {
      if (flag) {
        el.classList.add(disabledClass);
      } else {
        if (el.classList.contains(disabledClass)) {
          el.classList.remove(disabledClass);
        }
        el.disabled = false;
      }
    }

    // ANIMATE TIMELINE
    function animateTl(scrolling, el, tl) {
      let counter = 0;
      for (let i = 0; i < el.length; i++) {
        el[i].addEventListener("click", function () {
          if (!arrowPrev.disabled) {
            arrowPrev.disabled = true;
          }
          if (!arrowNext.disabled) {
            arrowNext.disabled = true;
          }
          const sign = (this.classList.contains("arrow__prev")) ? "" : "-";
          if (counter === 0) {
            tl.style.transform = `translateX(-${scrolling}px)`;
          } else {
            const tlStyle = getComputedStyle(tl);
            // add more browser prefixes if needed here
            const tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
            const values = parseInt(tlTransform.split(",")[4]) + parseInt(`${sign}${scrolling}`);
            tl.style.transform = `translateX(${values}px)`;
          }

          setTimeout(() => {
            isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
            isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
          }, 1100);

          counter++;
        });
      }
    }

    // ADD SWIPE SUPPORT FOR TOUCH DEVICES
    function setSwipeFn(tl, prev, next) {
      const hammer = new Hammer(tl);
      hammer.on("swipeleft", () => next.click());
      hammer.on("swiperight", () => prev.click());
    }
  })();
};