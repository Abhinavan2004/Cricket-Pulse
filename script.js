document.addEventListener("DOMContentLoaded", getMatchData);

async function getMatchData() {
    try {
        const response = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=ca9c616d-efa2-4a34-8ecc-375745d75342&offset=0");
        
        if (!response.ok) {
            throw new Error(`Network error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (data.status !== "success") {
            console.error("API did not return success");
            return;
        }

        const matchesList = data.data;
        if (!matchesList) return [];

        const relevantData = matchesList.map(match => `${match.name}, ${match.status}`);

        const matchesContainer = document.getElementById("matches");
        matchesContainer.innerHTML = relevantData
            .map(match => `<li>${match}</li>`)
            .join('');

    } catch (error) {
        console.error("Error fetching match data:", error);
    }
}
