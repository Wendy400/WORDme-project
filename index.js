const apiUrl = "https://freedictionaryapi.com/api/v1/entries/en/"

const errorMsg = document.getElementById("errorMsg")
const searchResults = document.getElementById("searchResults")
const wordsBar = document.getElementById("words")
const searchForm = document.getElementById("searchForm")
const searchHistory = document.getElementById("searchHistory")
const favorites = document.getElementById("favorites");
const clearBtn = document.getElementById("clearBtn");

const recentSearch = [];
const favWords = [];

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

    const word = wordsBar.value.trim();
    //the .trim handles spaces before a word

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
        const historyItem = document.createElement("p");
        historyItem.textContent = word;

        searchHistory.append(historyItem);
    });


    const saveButton = document.createElement("button");
    saveButton.textContent = "Save Word";

    saveButton.addEventListener("click", () => {
        if (!favWords.includes(data.word)) {
            favWords.push(data.word);
        }

        favorites.innerHTML = "";

        favWords.forEach(word => {
            const favoriteItem = document.createElement("p");
            favoriteItem.textContent = word;

            favorites.append(favoriteItem);
        });

        //console.log(favWords);
    });


    const firstEntry = data.entries[0];


    searchResults.innerHTML = ""; // Clear previous search results


    const wordHeading = document.createElement("h2");
    wordHeading.textContent = data.word;


    const pospeechHeading = document.createElement("h4");
    pospeechHeading.textContent = "Part of Speech";
    const pospeechPara = document.createElement("p");
    pospeechPara.textContent = firstEntry.partOfSpeech || "";


    //Optional chaining, here a chain exists checking if conditions are true,
    // then it goes to the next, instead of nesting if statements.
    const pronHeading = document.createElement("h4");
    pronHeading.textContent = "Pronunciation";
    const pronunPar = document.createElement("p");
    pronunPar.textContent = firstEntry.pronunciations?.[0]?.text || "";


    const defHeading = document.createElement("h4");
    defHeading.textContent = "Definition";
    const definitionPar = document.createElement("p");
    definitionPar.textContent = firstEntry.senses?.[0]?.definition || "";


    const synHeading = document.createElement("h4");
    synHeading.textContent = "Synonyms";
    const synonymPar = document.createElement("p");
    const topSynonyms = firstEntry.synonyms?.slice(0, 5);
    synonymPar.textContent = topSynonyms?.length ? topSynonyms.join(", ") : "No synonyms found.";


    const exHeading = document.createElement("h4");
    exHeading.textContent = "Example";
    const examplePar = document.createElement("p");
    //here .find is going through senses array in the entries object then picks the first one it finds 
    const senseWithExample = firstEntry.senses?.find(sense => sense.examples?.length > 0);
    examplePar.textContent = senseWithExample?.examples?.[0] || "No examples found";


    searchResults.append(
        wordHeading,
        pospeechHeading, pospeechPara,
        pronHeading, pronunPar,
        defHeading, definitionPar,
        synHeading, synonymPar,
        exHeading, examplePar,
        saveButton
    );
});