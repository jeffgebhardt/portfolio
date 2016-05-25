var allRepos = [];

requestRepos = function(callback) {
  $.get('/github/users/jeffgebhardt/repos' +
  '?sort=updated')
  .done(function(data) {
    allRepos = data;
  }).done(callback);
};

requestRepos();
