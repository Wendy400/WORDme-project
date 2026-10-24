
// 1. Tests input sanitization (lowercasing, trimming, removing internal spaces)
function sanitizeWord(input) {
    if (!input) return "";
    return input.trim().toLowerCase().replace(/\s+/g, '');
}

// 2. Tests adding items to history or favorites without duplication
function addUniqueWord(list, word) {
    const cleaned = sanitizeWord(word);
    if (cleaned && !list.includes(cleaned)) {
        list.push(cleaned);
    }
    return list;
}

// 3. Simulates the dictionary API call search
async function mockWordSearch(word, fetchImplementation) {
    const cleaned = sanitizeWord(word);
    if (!cleaned) throw new Error("Please enter a word");

    const response = await fetchImplementation(`https://freedictionaryapi.com/api/v1/entries/en/${cleaned}`);
    if (!response.ok) {
        throw new Error("error fetching word");
    }
    return response.json();
}


// --- Unit Tests Suite ---

describe("WORDMe Application Logic Tests", () => {

    test("sanitizeWord should trim spaces, lowercase, and remove internal spaces", () => {
        expect(sanitizeWord("  Apple  ")).toBe("apple");
        expect(sanitizeWord("BOY")).toBe("boy");
        expect(sanitizeWord("h   e llo")).toBe("hello");
        expect(sanitizeWord("")).toBe("");
    });

    test("addUniqueWord should prevent duplicate entries in history or favorites", () => {
        let history = [];
        
        history = addUniqueWord(history, "Code");
        history = addUniqueWord(history, "code"); // Duplicate case-insensitive check simulation
        history = addUniqueWord(history, "JavaScript");

        expect(history).toEqual(["code", "javascript"]);
        expect(history.length).toBe(2);
    });

    test("mockWordSearch should successfully fetch and return json data for valid words", async () => {
        const mockData = { word: "hello", entries: [{ partOfSpeech: "interjection" }] };
        
        // Mock global fetch implementation
        const fakeFetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData
        });

        const result = await mockWordSearch("HELLO", fakeFetch);

        expect(fakeFetch).toHaveBeenCalledWith("https://freedictionaryapi.com/api/v1/entries/en/hello");
        expect(result).toEqual(mockData);
    });

    test("mockWordSearch should throw an error if the network response is not ok", async () => {
        const fakeFetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 404
        });

        await expect(mockWordSearch("unknownword", fakeFetch)).rejects.toThrow("error fetching word");
    });

});