var allRepos = [];

var requestRepos = function(callback) {
  $.ajax({
    url: 'https://api.github.com/users/jeffgebhardt/repos' +
        '?sort=updated',
    type: 'GET',
    headers: {'Authorization': 'token ' + myToken},
    success: function(data, message, xhr) {
      console.log(data);
      allRepos = data;
      $('#repos').append(data.length);
    }
  });
};

requestRepos();
