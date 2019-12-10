(function () {
  'use strict';

  angular.module('app.media')
    .controller('MediaAddCtrl', MediaAddCtrl);

  /** @ngInject */
  function MediaAddCtrl($rootScope, $scope, toaster, mediaService, authService, appUtils) {

    var currentUser = authService.getCurrentUser(); //$rootScope.storage.currentUser;

    var formDropzone = $("#form-dropzone");
    formDropzone.dropzone({
      /* options */
      parallelUploads: 10
    });

    //Overite submitRequest method of dropzone.js file
    Dropzone.prototype.submitRequest = function (xhr, formData, files) {
      formDropzone.find('.dz-progress:visible').find('.dz-upload').css('background', 'green');
      var file = files[0];
      // Create the file metadata
      var metadata = {
        contentType: file.type
      };
      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = mediaService.uploadFile('files/', file, metadata);// Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          var dzProgress = formDropzone.find('.dz-progress:visible');
          dzProgress.find('.dz-upload').css('width', progress + '%');
          if (progress == 100) {
            setTimeout(function () {
              dzProgress.hide();
            }, 1000);
          }

          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function (error) {
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, function () {
          // Upload completed successfully, now we can get the download URL
          var downloadURL = uploadTask.snapshot.downloadURL;
          var imgFile = {
            fileName: uploadTask.snapshot.metadata.name,
            fileSize: uploadTask.snapshot.metadata.size,
            type: uploadTask.snapshot.metadata.contentType,
            timestampCreated: appUtils.getTimestamp(),
            timestampModified: appUtils.getTimestamp(),
            storageLocation: 'gs://' + uploadTask.snapshot.metadata.bucket + '/' + uploadTask.snapshot.metadata.fullPath,
            downloadUrl: uploadTask.snapshot.downloadURL,
            author: currentUser.email,
            bucket: uploadTask.snapshot.metadata.bucket,
            fullPath: uploadTask.snapshot.metadata.fullPath,
            displayName: file.name.split('.')[0],
            fileType: file.name.split('.')[1],
            description: '',
            alternativeText: '',
            caption: ''
          };
          mediaService.addFile(imgFile).then(function (res) {
            if (res.result) {
              toaster.success("Add file successfully!");
              return;
            }
            toaster.error(res.errorMsg);
          });
        });

    };

    var mediaVm = this;
    $rootScope.settings.layout.showSmartphone = false;
    $scope.customer = '';
    $scope.dropzoneConfig = {
      options: { // passed into the Dropzone constructor
        url: 'uploadFiles',
        paramName: "file", // The name that will be used to transfer the file
        maxFilesize: 0.5, // MB
        acceptedFiles: 'image/jpeg,image/png,image/gif',
        maxFiles: 1
      }
    };

  }

})();
