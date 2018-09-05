const KEY = 'AIzaSyBtw0iSiMB3XFpbiAmzODeQr5b-5UXDsPo';
const API_URL = 'https://www.googleapis.com/youtube/v3/search?';

const options = {
  key: KEY,
  q: '',
  maxResults: 10,
  part: 'snippet',
  order: 'title'
};

// clear the div so that it doesn't just keep scrolling content

const emptyDiv = () => {
  const results = document.getElementsByClassName('results')[0];
  results.innerHTML = '';
};

// grab the content from the youtube API
const getResults = () => {
  let request = new XMLHttpRequest();

  request.onload = function() {
    if (this.status === 200) {
      var data = JSON.parse(this.response);
      for (let i = 0; i < 10; i++) {
        const title = data.items[i].snippet.title;
        const channel = data.items[i].snippet.channelTitle;
        const results = document.getElementsByClassName('results')[0];
        const content = document.createTextNode(
          `title: "${title}" by channel: ${channel}\n`
        );
        const endLine = document.createElement('br');
        results.appendChild(content);
        results.appendChild(endLine);
      }
    } else {
      console.log(this);
      console.log('failure after connecting');
    }
  };

  request.onerror = function() {
    console.log('failure to connect');
  };

  const searchTerm = document.getElementById('searchTerm').value;
  options.q = searchTerm;
  const sortBy = document.getElementById('sort').value;
  options.order = sortBy;
  const REQUEST_URL =
    API_URL +
    'key=' +
    options.key +
    '&' +
    'q=' +
    options.q +
    '&' +
    'part=' +
    options.part +
    '&' +
    'maxResults=' +
    options.maxResults +
    '&' +
    'order=' +
    options.order;
  console.log(REQUEST_URL);
  request.open('GET', REQUEST_URL, true);
  request.send();
};
