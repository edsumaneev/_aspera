require('bootstrap');
// require('../../../node_modules/magnific-popup/dist/jquery.magnific-popup');
require('slick-carousel');

// контент в iframe 
$('.popup-youtube').magnificPopup({
  type: 'iframe'
});

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
// 
// accordion
// $(document).ready(function () {
//   $('.questions__subtitle').click(function () {
//     if (!$(this).hasClass('active')) {
//       $('.questions__subtitle').removeClass('active').next('p').slideUp();
//       $(this).addClass('active');
//       $(this).next('p').slideDown(300);
//     } else {
//       $(this).removeClass('active').next('p').slideUp(300);
//     }
//   });
// });
// 