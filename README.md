# web-assessment

A. Clearly identifies the URL (web address) of your deployed site.
https://juniorbz29.github.io/hangman/

<br>
<br>

B. Explains the differences between your initial plan as outlined in part
#1 and your final implementation. There is no penalty for deviating
from your initial plan, that is part of the learning and skill
development process.

The core features were implemented as planned including:

- Multilingual support with a language selector to select from either English or Spanish.
- Two minute timer with three rounds.
- Fetch random words from an API based on the selected language and word length. The game starts with a random 5 letter English or Spanish word, then increases to a 10 letter word, and finally a 15 letter word.
- When the player completes a round, it automatically jumps to the next round.
- The player will see the message: "You won!" if they win or "Game Over! Word: {WORD}" where "WORD" is the winning word.

Deviations:

- The design is quite different than the initial design. I was experimenting with the look and feel of the game and decided to make the following changes:
- Moving the timer, round notification and language selector at the top in one line where it can be easily accessible by the player. It uses flexbox to evenly distribute space between each item making the design more clean.
- In addition the letters were all on the same row in the initial design but I think this was not an ideal use of space especially if we would want the layout to be more reponsive. Spreading the letters across three lines makes it closer to a typical keyboard layout, improves readability, and makes better use of available screen space on both desktop and mobile devices. The color was also adjusted to match that of the typical keyboard on your phone.

<br>
<br>

C. Describes any features that you would add or improve to enhance your
project, given more time, and what you now know.

- Add more languages and word sources for better multilingual support.
- Include difficulty levels (easy, medium, hard) with varying word lengths and time limits.
- Implement a scoring system to track player performance across rounds.
- Enhance the UI with better animations for the hangman rendering.

<br>
<br>

D. Reflects upon the challenges you faced and achievements you made
during this assignment.

- The most challenging aspect of this application was the canvas rendering for drawing the hangman. The examples from the mozilla developer site helped a lot to resolve these problems: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo

- The timer logic was also a bit challenging, ensuring the timer stopped and restarted when necessary took some time to troubleshoot.
