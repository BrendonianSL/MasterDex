// This Function Fetches A Whole List Of Pokemon From The API
export default async function FetchPokemon(pokemonName) {
    // Base API URL
    let apiUrl = `https://pokeapi.co/api/v2/pokemon`;

    // If A Pokemon Name Is Specified
    if (pokemonName) {
        // Append The Name To The URL To Search For The Specific Pokemon
        apiUrl += `/${pokemonName}`;
    } else {
        // Append The Maximum Limit To The URL To Fetch All Pokemon Names And URLs
        apiUrl += `?limit=1302`;
    }

    // Attempt To Fetch Data
    try {
        const response = await fetch(apiUrl);

        // If Response Is Not OK, Throw An Error
        if (!response.ok) {
            console.log('FetchPokemon fetch error');
            throw new Error(response.statusText);
        }

        // Parse The Data In JSON Format
        const data = await response.json();
        console.log('Returning Data');
        //Returns Data.
        return data;

    } catch (error) {
        console.error(error);
    }
}
