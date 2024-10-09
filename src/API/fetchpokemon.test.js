//Imports For When We Need To Do REAL API TEST
import FetchPokemon from "./FetchPokemon";

//Increases The Amount Of Time Allotted For Async Tests
jest.setTimeout(60000);

//Creates A Test That Test The Fetch Pokemon Functionality.
describe('Fetch Pokemon', () => {
    it('Fetches The Whole List Of Pokemon From The API', async () => {

        //SETUP

        //We Expect Somewhere In The Dataset, That Oshawott Is Present.
        const expectedPokemonName = 'oshawott';

        //EXECUTION

        //Executes An API Search For All Pokemon.
        const response = await FetchPokemon();

        //Map A New Array Extracting The Names Of ALL Pokemon In The Array.
        const pokemonNames = response.map((pokemon) => {
            //Returns This Value Back To The Array
            return pokemon.name;
        })

        //ASSERTION

        //Checks If The Expected Pokemon Name Is In The Pokemon List.
        expect(pokemonNames).toContain(expectedPokemonName);

        //TEARDOWN

        //No Need To Do Any Teardown.
    });
});