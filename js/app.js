/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Save to Wallet success handler.
 */
var successHandler = function(params) {
  console.log('Object added successfully' + params);
}

/**
 * Save to Wallet failure handler.
 */
var failureHandler = function(params) {
  console.log('Object insertion failed' + params);
}

/**
 * Initialization function
 */
function init() {
  // Bind click event for 'Insert Loyalty Class' button.
  document.getElementById('loyalty').addEventListener('click', function() {
    $.get('insert?type=loyalty', function(data) {
      console.log(data);
    });
  });
  // Bind click event for 'Insert Offer Class' button.
  document.getElementById('offer').addEventListener('click', function() {
    $.get('insert?type=offer', function(data) {
      console.log(data);
    });
  });

  $.when(
    // Get jwt of loyalty object and render 'Save card' wallet button.
    $.get('jwt?type=loyalty', function(data) {
      saveToWallet = document.createElement('g:savetowallet');
      saveToWallet.setAttribute('jwt', data);
      saveToWallet.setAttribute('onsuccess', 'successHandler');
      saveToWallet.setAttribute('onfailure', 'failureHandler');
      document.querySelector('#loyaltysave').appendChild(saveToWallet);
      }
    ),
    // Get jwt of offer object and render 'Get offer' wallet button.
    $.get('jwt?type=offer', function(data) {
      saveToWallet = document.createElement('g:savetowallet');
      saveToWallet.setAttribute('jwt', data);
      saveToWallet.setAttribute('onsuccess', 'successHandler');
      saveToWallet.setAttribute('onfailure', 'failureHandler');
      document.querySelector('#offersave').appendChild(saveToWallet);
      }
    )
    ).done(function() {
      // it will execute after all above ajax requests are successful.
      script = document.createElement('script');
      script.src = 'https://apis.google.com/js/plusone.js';
      document.head.appendChild(script);
      }
    );
}

$(window).ready(function() {
  init();
});