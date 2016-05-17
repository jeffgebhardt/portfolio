// Populate Project
var projects = [];

function Project(opts){
  this.title = opts.title;
  this.image = opts.image;
  this.projectInfo = opts.projectInfo;
  this.projectUrl = opts.projectUrl;
};

Project.prototype.toHtml = function(){
  var $source = $('#projects-template').html();
  var template = Handlebars.compile($source);
  return template(this);
};



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

// Handle JSON
Project.loadAll = function(dataWePassIn) {
  JSON.parse(dataWePassIn).forEach(function(ele) {
    projects.push(new Project(ele));
  });
};

Project.appendAll = function(dataToAppend) {
  dataToAppend.forEach(function(p){
    $('#projects').append(p.toHtml());
  });
};

Project.fetchAll = function(){
  if (localStorage.data) {
    console.log('Local Storage Exists');
    var localData = localStorage.getItem('data');
    console.log(localData);
    Project.loadAll(localData);
    //Append to HTML
    Project.appendAll(projects);

  }
  else {
    $.getJSON('data/projects-data.json', function(data){
      console.log('Retrieved data from JSON file...');
      Project.loadAll(JSON.stringify(data));
      Project.appendAll(projects);
      //Set Local Storage
      localStorage.setItem('data', JSON.stringify(projects));
      console.log('Set Local Data');

    });
  }
};


// Call Functions
$(document).ready(function(){
  handleMainNav();
  handleMobileNav();
  handleInitialHide();
});
