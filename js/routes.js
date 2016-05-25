page('/', about);
page('/projects', projects);

page();

function about() {
  $('#projects').hide();
  $('#about').fadeIn('fast');
};

function projects() {
  $('#about').hide();
  $('#projects').fadeIn('fast');

  Project.fetchAll();
};
