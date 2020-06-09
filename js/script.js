
// UI INTERACTIONS / ANIMATIONS
$(document).ready(function(){
  $("#nav-icon3").click(function(){
    $("#nav-icon3").toggleClass("open");
    $(".sidebar").toggleClass("is-active");
    $(".body").toggleClass("active");
    $(".menu-option").toggleClass("active");

  });
  $(".moburger").click(function(){
    $(".mobile-sidebar").addClass("is-active");
  });
  $(".close-icon").click(function(){
    $(".mobile-sidebar").removeClass("is-active");
  });
});

// NAVIGATING TO DIFFERENT SECTIONS OF THE PAGE (CAROUSEL)
$(document).ready(function(){
  let searchParams = new URLSearchParams(window.location.search);
  searchParams.has('tab');
  let section = searchParams.get('tab');
  $('#'+section).toggleClass('active');
});
