// Populate Project
var projects = [];

function Project(opts){
  this.title = opts.title;
  this.projectInfo = opts.projectInfo;
  this.image = opts.image;
  this.projectUrl = opts.projectUrl;
};

Project.prototype.toHtml = function(){
  var $source = $('#projects-template').html();
  var template = Handlebars.compile($source);
  return template(this);
};

thumbnailData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(p){
  $('#projects').append(p.toHtml());
});

// Initial Hide
handleInitialHide = function() {
  $('#projects').hide();
};

// Switch Views
handleMainNav = function() {
  $('.mainNav').on('click touchstart', '.tab', function(){
    var val = $(this).attr('data-content');
    $('.tab-content').hide();
    $('.tab-content').each(function(index){
      if($(this).attr('id') === val){
        $(this).fadeIn('fast');
      }
    });
  });
};

handleMobileNav = function() {
  $('.mobilenav').on('click touchstart', '.tab', function(){
    var val = $(this).attr('data-content');
    $('.tab-content').hide();
    $('.tab-content').each(function(index){
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
};


// Call Functions
$(document).ready(function(){
  handleMainNav();
  handleMobileNav();
  handleInitialHide();
});
