// All of our quotes
const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    // ... (the rest of the quotes array)
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

// Store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
let startTime;  // Declare startTime in the outer scope to make it accessible

// Page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typing-value');

// Ensure DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (quoteElement && messageElement && typedValueElement) {
        document.getElementById('Start').addEventListener('click', () => {
            const quoteIndex = Math.floor(Math.random() * quotes.length);
            const quote = quotes[quoteIndex];
            words = quote.split(/\s+/);  // Split the quote into words
            wordIndex = 0;
            startTime = new Date().getTime();  // Start the timer

            const spanWords = words.map(word => `<span>${word}</span>`);  // Create spans for each word
            quoteElement.innerHTML = spanWords.join(' ');  // Put the words into the quote element

            const spans = quoteElement.querySelectorAll('span');
            if (spans.length > 0) {
                spans.forEach(span => span.className = '');  // Remove any classes from spans
                spans[0].className = 'highlight';  // Highlight the first word
            }

            messageElement.innerText = '';  // Clear any messages
            typedValueElement.value = '';  // Clear the input box
            typedValueElement.focus();  // Focus on the input box
            typedValueElement.className = '';  // Remove any error class
        });

        typedValueElement.addEventListener('input', () => {
            const currentWord = words[wordIndex];
            const typedValue = typedValueElement.value;

            if (typedValue === currentWord && wordIndex === words.length - 1) {
                const elapsedTime = new Date().getTime() - startTime;  // Calculate time taken
                const message = `CONGRATULATIONS! You finished in ${(elapsedTime / 1000).toFixed(2)} seconds.`;
                messageElement.innerText = message;  // Show success message
            } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
                typedValueElement.value = '';  // Clear input for next word
                wordIndex++;  // Move to next word
                const spans = quoteElement.querySelectorAll('span');
                spans.forEach(span => span.className = '');  // Reset classes
                if (spans[wordIndex]) spans[wordIndex].className = 'highlight';  // Highlight next word
            } else if (currentWord.startsWith(typedValue)) {
                typedValueElement.className = '';  // Clear error if typing is correct so far
            } else {
                typedValueElement.className = 'error';  // Add error class if wrong
            }
        });
    } else {
        console.error('Required DOM elements are missing.');
    }
});
