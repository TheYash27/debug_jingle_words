import JSConfetti from 'js-confetti'
import fetch from 'node-fetch'; // Assuming Node.js environment, adjust for browser

// Fetch a random word from an API
const wordApiUrl = 'https://random-word-api.herokuapp.com/word?length=5&lang=en';

async function fetchWord() {
    try {
        const response = await fetch(wordApiUrl);
        const data = await response.json();
        const word = data[0];
        const wordArr = word.split('');
        // ... rest of your code using the word and wordArr
        const wordDisplay = document.getElementById('word-display')
        document.addEventListener('submit', handleGuess)

        function renderSpaces() {
            const wordHtml = wordArr.map(() => {
                return `<span class="letter">-</span>`
            })
            wordDisplay.innerHTML = wordHtml.join('')
        }

        renderSpaces()

        function renderGuess(arr) {
            const wordHtml = arr.map(({ letter, color }) => {
                return `<span class="letter" style="color: ${color}">${letter}</span>`;
            });
            wordDisplay.innerHTML = wordHtml.join('');
        }
            
        function handleGuess(e) {
            e.preventDefault();
            
            /* bugs begin 🦠 
            let currentState = []
            let input = document.getElementById('users-input')
            let guess = input.id
            const guessArr = guess.split(' ')
            wordArr.foreach((letter) => {
                if (letter === guessArr['']) {
                    currentState.push(letter)
                } else {
                    currentState.push(letter)
                }
            })
            bugs end 🦠*/

            const input = document.getElementById('user-input');
            const guess = input.value.toLowerCase();
            const guessArr = guess.split('');

            const currentState = [];
            const correctPositionCount = 0;
            const presentCount = 0;

            wordArr.forEach((letter, index) => {
                const guessLetter = guessArr[index];

                if (letter === guessLetter) {
                    currentState.push({ letter, color: 'green' });
                    correctPositionCount++;
                } else if (guessArr.includes(letter)) {
                    currentState.push({ letter, color: 'yellow' });
                    presentCount++;
                } else {
                    currentState.push({ letter, color: 'gray' });
                }
            });

            renderGuess(currentState);
            checkWin(guess);

            if (correctPositionCount > 0 && presentCount > 0) {
                alert('You are close! Some letters are correct, but in the wrong position.');
            } else if (presentCount > 0) {
                alert('Some of the letters you guessed are in the word.');
            }

            input.value = '';
        }   

        function checkWin(guess) {
            if (word === guess) {
                const jsConfetti = new JSConfetti()
                jsConfetti.addConfetti({
                    emojis: ['🧑‍🎄', '🎅'],
                    emojiSize: 50,
                    confettiNumber: 60,
                    confettiRadius: 6,
                })
                jsConfetti.addConfetti()
            }
        }
    } catch (error) {
        console.error(error);
        // Handle the error gracefully, e.g., display an error message to the user
    }
}

// Call the function to start the word fetching process
fetchWord();
