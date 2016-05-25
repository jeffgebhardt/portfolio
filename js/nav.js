// Initial Hide
handleInitialHide = function() {
  $('#projects').hide();
};

//Handle the Hamburger Nav
handleMobileNav = function() {
  $('.mobilenav').on('click touchstart', function(){
    $('.mobilenav').fadeOut(500);
    $('.top-menu').removeClass('top-animate');
    $('body').removeClass('noscroll');
    $('.mid-menu').removeClass('mid-animate');
    $('.bottom-menu').removeClass('bottom-animate');
  });

  //Linkedin and Github Links
  $('#linkedin').on('touchstart', function(){
    window.location = 'https://www.linkedin.com/in/jeffrey-gebhardt-b1976451';
  });
  $('#github').on('touchstart', function(){
    window.location = 'https://github.com/jeffgebhardt';
  });
};

// Call Functions
$(document).ready(function(){
  handleInitialHide();
  handleMobileNav();
});
