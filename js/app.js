//Set Namespace
(function(module){
  //Projects Array
  Project.All = [];

  //Projects Constructor
  function Project(opts){
    this.title = opts.title;
    this.image = opts.image;
    this.projectInfo = opts.projectInfo;
    this.projectUrl = opts.projectUrl;
  };

  //Handle HTML Template
  Project.prototype.toHtml = function(){
    var $source = $('#projects-template').html();
    var template = Handlebars.compile($source);
    return template(this);
  };

  //Load JSON Data into Project.All array
  Project.loadAll = function(dataWePassIn) {
    Project.All = JSON.parse(dataWePassIn).map(function(ele){
      return new Project(ele);
    });
  };

  //Append JSON Data to DOM
  Project.appendAll = function(dataToAppend) {
    dataToAppend.map(function(p) {
      return $('#projects').append(p.toHtml());
    });
  };

  //Retrive Data from JSON or Local Storage
  Project.fetchAll = function(){
    if (localStorage.data) {
      console.log('Local Storage DOES Exist');

      $.ajax({
        type: 'head',
        url: 'data/projects-data.json',
        success: function (data, message, xhr) {
          var eTag = xhr.getResponseHeader('eTag');
          console.log('Current eTag = ' + eTag);
          var compareETag = JSON.parse(localStorage.getItem('eTag1'));
          console.log('Compare eTag = ' + compareETag);

          if (eTag !== compareETag) {
            console.log('Changes to JSON file detected');
            console.log('Retrieved data from JSON file...');
            Project.loadAll(JSON.stringify(data));
            Project.appendAll(Project.All);
            //Set Local Storage
            localStorage.setItem('data', JSON.stringify(Project.All));
            console.log('Setting Local Data...');
            Project.appendAll(Project.All);
          }
          else {
            console.log('NO change to JSON Data');
            var localData = localStorage.getItem('data');
            console.log('Retriving Local Data');
            Project.loadAll(localData);
          }
          Project.appendAll(Project.All);

          //Load from Admin.js
          Project.test();

        }
      });
    }
    else {
      $.getJSON('data/projects-data.json', function(data){
        console.log('Retrieved data from JSON file...');
        Project.loadAll(JSON.stringify(data));
        Project.appendAll(Project.All);
        localStorage.setItem('data', JSON.stringify(Project.All));
        console.log('Locale Storage DOES NOT exist.');
        console.log('Setting Local Data...');
      })
      .success(function(data, message, xhr) {
        var eTag1 = xhr.getResponseHeader('eTag');
        localStorage.setItem('eTag1', JSON.stringify(eTag1));
      });
    }
  };


  // Call Functions
  Project.fetchAll();

  module.Project = Project;
})(window);
