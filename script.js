const key = 'AIzaSyBtw0iSiMB3XFpbiAmzODeQr5b-5UXDsPo';
const url = 'https://www.googleapis.com/youtube/v3/search';

const options = {
  type: '',
  key: key,
  q: 'surfing',
  maxResults: 25,
  part: 'snippet'
};

const getResults = () => {
  let request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var data = JSON.parse(this.response);
    } else {
      // We reached our target server, but it returned an error
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();
};
