const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.querySelector('.quote');
const authorText = document.querySelector('.author');
const twitterBtn = document.querySelector('.twitter-button');
const newQuoteBtn = document.querySelector('.new-quote');
const loader = document.querySelector('.loader');

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

async function getQuote() {
  loading();
  const proxyUrl = 'https://radiant-hamlet-09681.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    authorText.textContent = data.quoteAuthor ? data.quoteAuthor : 'Unknown';

    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = data.quoteText;
    complete();
  } catch (error) {
    getQuote();
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();
