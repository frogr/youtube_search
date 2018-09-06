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
      const checkbox = document.getElementById('checkbox').checked;
      const info = data.items;
      if (checkbox) {
        info.sort(function(a, b) {
          let nameA = a.snippet.title.toLowerCase();
          let nameB = b.snippet.title.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      } else {
      }
      for (let i = 0; i < 10; i++) {
        injectData(i, info);
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
const injectData = (i, info) => {
  const results = document.getElementsByClassName('results')[0];

  const div = document.createElement('div');
  div.className = 'resultItem';
  results.append(div);

  const title = info[i].snippet.title;
  const date = info[i].snippet.publishedAt.toString().substring(0, 10);

  const resultItem = document.getElementsByClassName('resultItem')[i];

  const htmlTitle = document.createElement('p');
  const titleData = document.createTextNode(`"${title}" `);
  htmlTitle.className = 'resultTitle';
  htmlTitle.appendChild(titleData);

  const htmlDate = document.createElement('p');
  const oDate = new Date(date);
  const dateData = document.createTextNode(`${oDate}`);
  htmlDate.className = 'resultDate';
  htmlDate.appendChild(dateData);
  htmlTitle.appendChild(htmlDate);

  resultItem.appendChild(htmlTitle);
  resultItem.appendChild(document.createElement('br'));
};

// checkbox calls this to sort results alphabetically
function sortListAlph() {
  let i,
    switching,
    b,
    shouldSwitch,
    dir,
    switchcount = 0;
  switching = true;
  dir = 'asc';
  while (switching) {
    switching = false;
    b = document.getElementsByClassName('resultTitle');
    for (i = 0; i < b.length - 1; i++) {
      shouldSwitch = false;
      if (dir == 'asc') {
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == 'desc') {
        if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      console.log(b[i].parentNode);
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}

// checkbox calls this to sort by date
function sortListDate() {
  let i,
    switching,
    b,
    shouldSwitch,
    dir,
    switchcount = 0;
  switching = true;
  dir = 'asc';
  while (switching) {
    switching = false;
    grabDate = document.getElementsByClassName('resultDate');
    for (i = 0; i < grabDate.length - 1; i++) {
      dateData = grabDate[i].innerHTML;
      dateData2 = grabDate[i + 1].innerHTML;

      b = new Date(dateData);
      t = new Date(dateData2);

      shouldSwitch = false;
      if (dir == 'asc') {
        if (b > t) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == 'desc') {
        if (b < t) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      grabDate[i].parentNode.parentNode.insertBefore(
        grabDate[i + 1].parentNode,
        grabDate[i].parentNode
      );
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}
