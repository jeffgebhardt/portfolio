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

  // Initial Hide
  handleInitialHide = function() {
    $('#projects').hide();
  };

  // Switch Views
  handleMainNav = function() {
    $('.mainNav').on('click touchstart', '.tab', function(){
      var val = $(this).attr('data-content');
      $('.tab-content').hide();
      $('.tab-content').map(function(index){
        if($(this).attr('id') === val){
          $(this).fadeIn('fast');
        }
      });
    });
  };

  //Handle the Hamburger Nav
  handleMobileNav = function() {
    $('.mobilenav').on('click touchstart', '.tab', function(){
      var val = $(this).attr('data-content');
      $('.tab-content').hide();
      $('.tab-content').map(function(index){
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

    //Linkedin and Github Links
    $('#linkedin').on('touchstart', function(){
      window.location = 'https://www.linkedin.com/in/jeffrey-gebhardt-b1976451';
    });
    $('#github').on('touchstart', function(){
      window.location = 'https://github.com/jeffgebhardt';
    });
  };

  //Load JSON Data
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

  //Retrive Data from JSON/Local Storage
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
  $(document).ready(function(){
    handleMainNav();
    handleMobileNav();
    handleInitialHide();
    Project.fetchAll();
  });

  module.Project = Project;
})(window);
