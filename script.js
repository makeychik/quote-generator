const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.querySelector('.quote');
const authorText = document.querySelector('.author');
const twitterBtn = document.querySelector('.twitter-button');
const newQuoteBtn = document.querySelector('.new-quote');
const loader = document.querySelector('.loader');

let apiQuotes = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  authorText.textContent = quote.author ? quote.author : 'Unknown';

  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  quoteText.textContent = quote.text;
  complete();
}

async function getQuotes() {
  loading();
  // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    getQuote();
    console.log('whoops, no quote', error);
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
