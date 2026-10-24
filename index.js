const apiUrl = "https://freedictionaryapi.com/api/v1/entries/en/"

const errorMsg = document.getElementById("errorMsg")
const searchResults = document.getElementById("searchResults")
const wordsBar = document.getElementById("words")
const searchForm = document.getElementById("searchForm")
const searchHistory = document.getElementById("searchHistory")
const favorites = document.getElementById("favorites");
const clearBtn = document.getElementById("clearBtn");
const themeBtn = document.getElementById("themeBtn");

const recentSearch = [];
const favWords = [];

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeBtn.textContent = "☀️ Light mode";
    } else {
        themeBtn.textContent = "🌙 Dark mode";
    }
});



async function wordSearch(word) {
    try {
        const wordSearchResponse = await fetch(apiUrl + word)

        if (!wordSearchResponse.ok) {
            throw new Error("error fetching word")
        }

        const data = await wordSearchResponse.json()
        return data

    } catch (error) {
        console.error("Invalid! Enter a word", error);
        return null;
    }
}

clearBtn.addEventListener("click", () => {
    searchResults.innerHTML = "";
    errorMsg.textContent = "";
})

searchForm.addEventListener("submit", async event => {
    event.preventDefault();

    const word = wordsBar.value.trim().toLowerCase().replace(/\s+/g, '');
    //the .trim handles spaces before a word, handles capitalised words.
    //.replace removes internal spaces, \s, whitespace character(spaces, tabs) 
    // /g global flag- look for all the spaces in the string not just the first one

    if (!word) {
        errorMsg.textContent = "Please enter a word";
        searchResults.innerHTML = ""; // Clear results if input is empty
        return;
    }

    errorMsg.textContent = "";
    const data = await wordSearch(word);


    if (!data || !data.entries || data.entries.length === 0) {
        errorMsg.textContent = "Invalid! Enter a valid word.";
        searchResults.innerHTML = ""; // Clear out any old results on error
        return;
    }


    //recentSearch.push(data.word);
    if (!recentSearch.includes(data.word)) {
        recentSearch.push(data.word);
    }
    //console.log(recentSearch);

    searchHistory.innerHTML = "";

    // Create an element for each recent search
    recentSearch.forEach(word => {
        const historyItem = document.createElement("span");
        historyItem.textContent = word;
        historyItem.classList.add("word-chip");

        searchHistory.append(historyItem);
    });


    const saveButton = document.createElement("button");
    saveButton.textContent = "Save Word";
    saveButton.classList.add("save-button");

    saveButton.addEventListener("click", () => {
        if (!favWords.includes(data.word)) {
            favWords.push(data.word);
        }

        favorites.innerHTML = "";

        favWords.forEach(word => {
            const favoriteItem = document.createElement("span");
            favoriteItem.textContent = word;
            favoriteItem.classList.add("favorite-chip");

            favorites.append(favoriteItem);
        });

        //console.log(favWords);
    });


    const firstEntry = data.entries[0];


    searchResults.innerHTML = ""; // Clear previous search results


    const wordHeading = document.createElement("h2");
    wordHeading.textContent = data.word;
    wordHeading.classList.add("word-heading")


    // const pospeechHeading = document.createElement("h4");
    // pospeechHeading.textContent = "Part of Speech";
    const pospeechPara = document.createElement("p");
    pospeechPara.textContent = firstEntry.partOfSpeech || "";
    pospeechPara.classList.add("part-of-speech");


    //Optional chaining, here a chain exists checking if conditions are true,
    // then it goes to the next, instead of nesting if statements.

    // const pronHeading = document.createElement("h4");
    //pronHeading.textContent = "Pronunciation";
    const pronunPar = document.createElement("p");
    //pronunPar.textContent = firstEntry.pronunciations?.[0]?.text || "";
    pronunPar.classList.add("pronunciation");
    //...........................................................
    //SPEAKER , voice output feature
    const pronText = firstEntry.pronunciations?.[0]?.text || "";

    // Create a container span for the pronunciation text
    const pronTextSpan = document.createElement("span");
    pronTextSpan.textContent = pronText;

    // Create a speaker/audio button if pronunciation text exists
    if (pronText) {
        const speakButton = document.createElement("button");
        speakButton.type = "button";
        speakButton.innerHTML = "🔊 Listen";
        speakButton.classList.add("speak-button");

        // Add event listener to trigger speech synthesis
        speakButton.addEventListener("click", () => {
            playPronunciation(data.word);
        });

        pronunPar.append(pronTextSpan, speakButton);
    } else {
        pronunPar.textContent = "No pronunciation available";
    }

    function playPronunciation(word) {
        // Check if browser supports speech synthesis
        if (!('speechSynthesis' in window)) {
            alert("Text-to-speech is not supported in this browser.");
            return;
        }

        // Cancel any ongoing speech so they don't overlap if clicked rapidly
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = "en-US"; // Set language to English
        utterance.rate = 0.9;   // Slightly slower rate for clearer pronunciation learning

        window.speechSynthesis.speak(utterance);
    }

    //.............................................

    const defHeading = document.createElement("h4");
    defHeading.textContent = "Definition";
    defHeading.classList.add("detail-heading")
    const definitionPar = document.createElement("p");
    definitionPar.textContent = firstEntry.senses?.[0]?.definition || "";
    definitionPar.classList.add("detail-text")


    const synHeading = document.createElement("h4");
    synHeading.textContent = "Synonyms";
    synHeading.classList.add("detail-heading")
    const synonymPar = document.createElement("p");
    const topSynonyms = firstEntry.synonyms?.slice(0, 5);
    synonymPar.textContent = topSynonyms?.length ? topSynonyms.join(", ") : "No synonyms found.";
    synonymPar.classList.add("detail-text")


    const exHeading = document.createElement("h4");
    exHeading.textContent = "Example";
    exHeading.classList.add("detail-heading")
    const examplePar = document.createElement("p");
    //here .find is going through senses array in the entries object then picks the first one it finds 
    const senseWithExample = firstEntry.senses?.find(sense => sense.examples?.length > 0);
    examplePar.textContent = senseWithExample?.examples?.[0] || "No examples found";
    examplePar.classList.add("example-box");


    searchResults.append(
        wordHeading,
        pospeechPara,
        pronunPar,
        defHeading, definitionPar,
        synHeading, synonymPar,
        exHeading, examplePar,
        saveButton
    );
});