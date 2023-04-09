// 'use strict';

//const smartyUrl = 'https://us-street.api.smartystreets.com/street-address?auth-id=19785289899902913&candidates=10&street=86%20Frontage%20Road&city=Belmont&state=MA';
//const smartyApiKey = '19785289899902913'; // replace with your API key
//const smartyUrl = 'https://us-street.api.smartystreets.com/street-address?auth-id=' + smartyApiKey + '&candidates=10';
let smartyUrl = 'https://ecajaxproxy.herokuapp.com/streets/street-address?candidates=10';
const smartyInit = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Host: 'us-street.api.smartystreets.com',
  },
};
//const parksUrl = 'https://developer.nps.gov/api/v1/parks?stateCode=ca&api_key=7NPUhkm1jtqX7Muj86oafxkn0XLycFvDN8jwjWE1';
const parksUrl = 'https://ecajaxproxy.herokuapp.com/nps/api/v1/parks?stateCode=ca';
const parksFallback = {
  "description": "Christopher 'Sparrow' Hren is one bad mother fucker. He was born in Oak Park, Illinois and moved to 3/4's of an acre in Fox River Grove, Illinos. Here, in the Northwest Suburbs of Chicago, Sparrow took to the woods and could often be found in swamps, building tree forts, collecting animal bones and walking the entirety of The Grove. Currentlty, he lives on an acre in the Tamarack subdivision.",
  "fullName": "Christopher Jason Hren",
  "url": "https://www.linkedin.com/in/chris-hren/",
};
const addressField = document.querySelector('#address');
const cityField = document.querySelector('#city');
const stateField = document.querySelector('#state');
//const $zipField = $('#zip');
const zipField = document.querySelector('#zip');
const parkThumb = document.querySelector('#specials h2 img');
const parkSection = document.querySelector('#specials');
const parkName = document.querySelector('#specials h2 a');
const parkDesc = document.querySelector('#specials p');

const smartyUpdateUISuccess = function(parsedData) {
//  const parsedData = JSON.parse(data);
//  console.log(parsedData);
  const zip = parsedData[0].components.zipcode;
  const plus4 = parsedData[0].components.plus4_code;
//  console.log(zip + '-' + plus4);
  zipField.value = zip + '-' + plus4;
};
const parkUpdateUISuccess = function(parsedData) {
  //const parsedData = JSON.parse(data);
  console.log(parsedData);
  const number = Math.floor(Math.random() * parsedData.data.length);
  parkName.textContent = parsedData.data[number].fullName;
  parkName.href = parsedData.data[number].url;
  parkDesc.textContent = parsedData.data[number].description;
  parkThumb.src = '/images/pfp-50-50.png';
  parkSection.classList.remove('hidden');
}
const smartyUpdateUIError = function(error) {
  console.log(error);
};
const parkUpdateUIError = function(error) {
  console.log(error);
  parkName.textContent = parksFallback.fullName;
  parkName.href = parksFallback.url;
  parkDesc.textContent = parksFallback.description;
  console.log('ERROR');
  parkThumb.src = '/images/pfp-50-50.png';
  parkSection.classList.remove('hidden');
};

// const responseMethod = function(httpRequest, succeed, fail) {
//   if (httpRequest.readyState === 4) {
//     if (httpRequest.status === 200) {
//       succeed(httpRequest.responseText);
//     } else {
//       fail(httpRequest.status + ': ' + httpRequest.responseText);
//     }
//   }
// }

// const createRequest = function(url, succeed, fail) {
//   const httpRequest = new XMLHttpRequest(url);
//   httpRequest.addEventListener('readystatechange', (url) => responseMethod(httpRequest, succeed, fail));
//   httpRequest.open('GET', url);
//   httpRequest.send();
// };

const handleErrors = function(response) {
  if(!response.ok) {
    throw new Error((response.status + ': ' + response.statusText));
  }
  return response.json();
}

const createRequest = function(url, succeed, fail, init) {
  fetch(url, init)
    .then((response) => handleErrors(response))
    .then((data) => succeed(data))
    .catch((error) => fail(error));
};

const checkCompletion = function() {
  if (addressField.value !== '' &&
      cityField.value !== '' &&
      stateField.value !== '') {
        const requestUrl = smartyUrl + 
          '&street=' + addressField.value + 
          '&city=' + cityField.value + 
          '&state=' + stateField.value;
          console.log('LISTENING');
        createRequest(requestUrl, smartyUpdateUISuccess, smartyUpdateUIError, smartyInit);
      }
}
//createRequest(smartyUrl);
//createRequest(parksUrl, parkUpdateUISuccess, parkUpdateUIError);

addressField.addEventListener('blur', checkCompletion);
cityField.addEventListener('blur', checkCompletion);
stateField.addEventListener('blur', checkCompletion);
console.log($(document).ready()[0].readyState)
if($(document).ready()[0].readyState === 'complete'){
  console.log('parkity park');
  createRequest(parksUrl, parkUpdateUISuccess, parkUpdateUIError);
}
// window.addEventListener('DOMContentLoaded', () => {
//   console.log('parkity park');
//   createRequest(parksUrl, parkUpdateUISuccess, parkUpdateUIError);
// })