
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

// Function to tab switch among different sections of different pages
$(document).ready(function(){
  let searchParams = new URLSearchParams(window.location.search);
  searchParams.has('tab');
  let section = searchParams.get('tab');
  $('.carousel-grid > div').removeClass('active');
  $('#'+section).addClass('active');
});

// Function to tab switch among same page sections
function switchTab(tab_id)
{
  $('.carousel-grid > div').removeClass('active');
  $('#'+tab_id).addClass('active');
}

// Function to check if the tab you want to access is in the same page or different page
$(document).ready(function(){
  $('a').on("click",function(e){
    let cur_url = window.location.href; // current url
    let cur_link = cur_url.split('?')[0].split('/')[4]; // current html file
    console.log(cur_link);
    let url = $(this).attr('href'); // url to redirect
    let red_link = url.split('?')[0]; // html file to load.
    let red_tab = url.split('?')[1].split('=')[1]; // section to load.
    if(cur_link == red_link) // if both the html pages match that means the section to load is in the same page.
    {
      e.preventDefault(); // prevent redirection
      switchTab(red_tab); // load section
      const state = { 'page_id': 1, 'user_id': 5 };  // push it in the history and update the url
      const title = 'Student Welfare Office, MNNIT';
      history.pushState(state, title, url);
    }
  });
});
// POPUP INTERACTIONS
function popup(i)
{
  $('.overlay').eq(i).toggleClass("active");
}

// IMAGE Gallery interactions
$(document).ready(function(){
  $(".img-grid .thumbnail").on("click",function(){
    let image = $(this).find(".thumbnail-image").attr("style");
    $(".img-big").attr("style",image);
    popup(0);
  });
});
