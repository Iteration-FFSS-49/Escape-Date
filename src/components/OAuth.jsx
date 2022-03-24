import React from 'react';


const OAuth = () => {
  return (
  <div>
    <div id="my-signin2" ></div>
    <script>
      function onSuccess(googleUser) {
        console.log('Logged in as: ' + googleUser.getBasicProfile().getName())
      }
      function onFailure(error) {
        console.log(error)
      }
      function renderButton() {
        gapi.signin2.render('my-signin2', {
          'scope': 'profile email',
          'width': 240,
          'height': 50,
          'longtitle': true,
          'theme': 'dark',
          'onsuccess': onSuccess,
          'onfailure': onFailure
        })
      }
    </script>
    <script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>
    </div>
  );
};

export default OAuth;