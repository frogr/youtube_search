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

// grab the content from the youtube API and then inject it into the page
const getResults = () => {
  let request = new XMLHttpRequest();

  request.onload = function() {
    if (this.status === 200) {
      var data = JSON.parse(this.response);
      for (let i = 0; i < 10; i++) {
        injectData(i, data);
      }
    } else {
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

  // creating the URL that we're going to send to the youtube API by modifying the options object we created earlier, then sending it
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
  request.open('GET', REQUEST_URL, true);
  request.send();
};

// handling the data injection
const injectData = (i, data) => {
  const results = document.getElementsByClassName('results')[0];

  const div = document.createElement('div');
  div.className = 'resultItem';
  results.append(div);

  const title = data.items[i].snippet.title;
  const channel = data.items[i].snippet.channelTitle;
  const date = data.items[i].snippet.publishedAt.toString().substring(0, 9);
  const thumbnail = data.items[i].snippet.thumbnails.medium.url;
  console.log(thumbnail);

  const resultItem = document.getElementsByClassName('resultItem')[0];

  const htmlTitle = document.createTextNode(`"${title}" `);
  const htmlChannel = document.createTextNode(`by: ${channel} `);
  const htmlDate = document.createTextNode(`published: ${date}`);
  const img = document.createElement('img');
  img.src = thumbnail;

  results.append(div);
  resultItem.appendChild(img);
  resultItem.appendChild(document.createElement('br'));
  resultItem.appendChild(htmlTitle);
  resultItem.appendChild(document.createElement('br'));
  resultItem.appendChild(htmlChannel);
  resultItem.appendChild(document.createElement('br'));
  resultItem.appendChild(htmlDate);
  resultItem.appendChild(document.createElement('br'));
};
