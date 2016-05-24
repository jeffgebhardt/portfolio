var repos = {};

repos.all = [];

repos.requestRepos = function(callback) {
  $.ajax({
    url: 'https://api.github.com/users/jeffgebhardt/repos' +
        '?per_page=10' +
        '&sort=updated',
    type: 'GET',
    headers: {'Authorization': 'token ' + myToken},
    success: function(data, message, xhr) {
      console.log(data);
      repos.all = data;
    }
  });
};

repos.with = function(attr) {
  return repos.all.filter(function(repo) {
    return repo[attr];
  });
};
