// Initial Hide
handleInitialHide = function() {
  $('#projects').hide();
};

// Switch Views
handleMainNav = function() {
  $('.mainNav').on('click touchstart', '.tab', function(){
    var val = $(this).attr('data-content');
    $('.tab-content').hide();
    $('.tab-content').map(function(index){
      if($(this).attr('id') === val){
        $(this).fadeIn('fast');
      }
    });
  });
};

//Handle the Hamburger Nav
handleMobileNav = function() {
  $('.mobilenav').on('click touchstart', '.tab', function(){
    var val = $(this).attr('data-content');
    $('.tab-content').hide();
    $('.tab-content').map(function(index){
      if($(this).attr('id') === val){
        $(this).fadeIn('fast');
      }
    });
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
  handleMainNav();
  handleMobileNav();
  handleInitialHide();
});
