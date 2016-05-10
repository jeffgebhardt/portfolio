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
