// Selecting the text area
const textArea = document.getElementById("textArea");

// Selecting the submit button
const submitBtn = document.getElementById("btn");

// Selecting the reset button
const resetBtn = document.getElementById("reset");

// Selecting result div
const resultDiv = document.querySelector(".result");

// Selecting result text paragraphs
const characterCountText = document.getElementById("charCount");
const wordCountText = document.getElementById("wordCount");
const uniqueWordCountText = document.getElementById("uniqueWordCount");
const countByUniqueWord = document.getElementById("countByUniqueWord");

// Adding event listener for the reset button
resetBtn.addEventListener("click", () => {
  // Clearing the text area
  textArea.value = "";
  resultDiv.classList.add("hidden");
  console.log(resultDiv.classList);
  characterCountText.textContent = "";
  wordCountText.textContent = "";
  uniqueWordCountText.textContent = "";
  countByUniqueWord.innerHTML = "";
});

// Adding event listener to the submit button to handle a click event
submitBtn.addEventListener("click", () => {
  // Extracting the text area contents
  const text = textArea.value;

  // Empty text validation
  if (text.length === 0) {
    alert("Please enter a text to read!");
    return;
  }

  // Finding words count in the text
  const wordsCount = text.split(" ").length;

  // Seperating characters in the text area
  const characters = text.split("");

  // Counting the number of alphabet characters in the text area contents using Reduce()
  const characterCount = characters.reduce((acc, character) => {
    if (isAlphabet(character)) {
      acc++;
    }
    return acc;
  }, 0);

  // Finding unique words and their counts
  const wordsSet = new Set(text.split(" "));
  const uniqueWordCount = wordsSet.size;

  const uniqueWords = {};
  const cleanText = removePunctuation(text);

  const words = cleanText.split(" ");
  words.forEach((word) => {
    if (uniqueWords[word]) {
      uniqueWords[word]++;
    } else {
      uniqueWords[word] = 1;
    }
  });

  // Appending result to the DOM elements
  characterCountText.textContent = `Character Count: ${characterCount}`;
  wordCountText.textContent = `Word Count: ${wordsCount}`;
  uniqueWordCountText.textContent = `Unique Word Count: ${uniqueWordCount}`;

  const title = document.createElement("h3");

  title.classList.add("title");

  title.innerHTML = `Count By Unique Word`;

  countByUniqueWord.appendChild(title);

  const containerDiv = document.createElement("div");
  containerDiv.classList.add("unique-word-div"); //white box

  for (const word in uniqueWords) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.innerHTML = `${word}: ${uniqueWords[word]}`;
    div.appendChild(p);
    containerDiv.appendChild(div);
  }
  countByUniqueWord.appendChild(containerDiv);
  resultDiv.classList.remove("hidden");
});

function isAlphabet(character) {
  const alphabets = "abcdefghijklmnopqrstuvwxyz";

  return alphabets.includes(character.toLowerCase());
}

function removePunctuation(text) {
  let cleanText = "";
  for (let i = 0; i < text.length; i++) {
    if (isAlphabet(text[i]) || text[i] === " ") {
      cleanText += text[i];
    }
  }
  return cleanText;
}
