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

  $('#linkedin').on('click touchstart', function(){
    window.location = 'https://www.linkedin.com/in/jeffrey-gebhardt-b1976451';
  });
  $('#github').on('click touchstart', function(){
    window.location = 'https://github.com/jeffgebhardt';
  });
};

Projects.fetchAll = function() {
  if (localStorage.data) {

    $.ajax({
      url: 'data/hackerIpsum.json',
      success: function (data, message, xhr) {
        var eTag = xhr.getResponseHeader('eTag');
        console.log('eTag = ' + eTag);
        var compareETag = JSON.parse(localStorage.getItem('eTag1'));
        console.log('eTag1 = ' + compareETag);

        if (eTag !== compareETag) {
          console.log('Etags are not the same');
          $.getJSON('data/projectsData.json', function(data){
            Projects(data);
            localStorage.setItem('data', JSON.stringify(Projects));
            projects.toHtml();
          });

        } else {
          var localData = localStorage.getItem('data');
          Projects(JSON.parse(localData));
        }
        Projects.toHtml();
      }
    });

  } else {
    $.getJSON('data/hackerIpsum.json', function(data){
      Projects(data);
      localStorage.setItem('data', JSON.stringify(Projects));
      Projects.toHtml();
    }).success(function(data, message, xhr) {
      var eTag1 = xhr.getResponseHeader('eTag');
      localStorage.setItem('eTag1', JSON.stringify(eTag1));
    });
  }
};


// Call Functions
$(document).ready(function(){
  handleMainNav();
  handleMobileNav();
  handleInitialHide();
});
