// Populate Project
var projects = [];

function Project(opts){
  this.title = opts.title;
  this.image = opts.image;
};

Project.prototype.toHtml = function(){
  var $newProject = $('article.template').clone();

  $newProject.find('h3').html(this.title);
  $newProject.find('img').attr('src', this.image);

  $newProject.removeClass('template');

  return $newProject;
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
  $('.mainNav').on('click', '.tab', function(){
    var val = $(this).attr('data-content');
    $('.tab-content').hide();
    $('.tab-content').each(function(index){
      if($(this).attr('id') === val){
        $(this).fadeIn(2000);
      }
    });
  });
};

// Call Functions
$(document).ready(function(){
  handleMainNav();
  handleInitialHide();
});
