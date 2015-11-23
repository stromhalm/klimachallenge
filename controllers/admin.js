klimaChallenge.controller('adminCtrl', function($scope, Auth, projects, filepickerService) {

   $scope.auth = Auth;
   $scope.email = "";
   $scope.password = "";

   $scope.projects = projects.db;
   $scope.allEvents = projects.events;
   $scope.carriers = projects.carriers;

   projects.db.$loaded(function() {
      $scope.loaded = true;
   });

   $scope.saveToDb = function (value) {
      projects.db.$save(value);
   };

   // any time auth status updates, add the user data to scope
   $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
   });

   $scope.login = function(email, password) {

      Auth.$authWithPassword({
         email: email,
         password: password
      }).then(function(authData) {

      }).catch(function(error) {
         $scope.loginError = true;
         console.error("Authentication failed:", error);
      });
   }

   $scope.pickImage = function(project) {

      $scope.pickerProject = project;
      filepickerService.pick(
         {
            mimetype: 'image/*',
            services: ['COMPUTER', 'FACEBOOK', 'GOOGLE_DRIVE', 'INSTAGRAM', 'DROPBOX'],
            language: 'de'
         },
         onSuccess
      );
   }

   $scope.deleteProject = function(project) {
      if (confirm("Soll die Aktion \"" + project.formal.actionName + "\" wirklich gelöscht werden?")) {
         projects.db.$remove(project);
      }
   }

   function onSuccess(image) {
      $scope.pickerProject.formal.image = image;
      projects.db.$save($scope.pickerProject);
   }
});
