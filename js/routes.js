page('/', about);
page('/projects', projects);

page();

function about() {
  $('#projects').hide();
  $('#about').fadeIn('fast');

  handleMobileNav();
};

function projects() {
  $('#about').hide();
  $('#projects').fadeIn('fast');

  Project.fetchAll();

  handleMobileNav();
};
