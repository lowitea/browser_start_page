$(document).ready(function () {

  // random backgrounds
  var bgm = [
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
    'images/4.jpg',
    'images/5.jpg',
    'images/6.jpg',
    'images/7.jpg',
    'images/8.jpg',
    'images/9.jpg',
    'images/10.jpg',
    'images/11.jpg',
    'images/12.jpg',
    'images/13.jpg',
    'images/14.jpg',
    'images/15.jpg',
    'images/16.jpg',
    'images/17.jpg',
    'images/18.jpg',
    'images/19.jpg',
  ];

  $('body').css({
    'background': 'url(' + bgm[Math.floor(Math.random() * bgm.length)] + ') no-repeat center center fixed',
    'background-color': '#000',
    'background-size': 'cover',
  });

  function second_passed() {
    $('.clock').removeClass('is-off');
  }
  setTimeout(second_passed, 2000)

  $('.switcher').on('click', function (e) {
    e.preventDefault();
    $('.screen').toggleClass('glitch');
  });


  var newDate = new Date();
  newDate.setDate(newDate.getDate());

  setInterval(function () {

    var hours = new Date().getHours();
    var seconds = new Date().getSeconds();
    var minutes = new Date().getMinutes();

    var realTime = (hours < 10 ? '0' : '') + hours + ' : ' + (minutes < 10 ? '0' : '') + minutes + ' : ' + (seconds < 10 ? '0' : '') + seconds

    $('.time').html(realTime);
    $('.time').attr('data-time', realTime);

  }, 1);

});