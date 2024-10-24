//This Function Uses Any URL Passed Into It To Fetch Data.
export default async function FetchData(apiURL) {

    //Attempts To Fetch Data Using URL.
    try {
        //Fetch Data With The URL. Returns A RESPONSE Object.
        const response = await fetch(apiURL);

        //Checks If The Response Is Unsuccessful.
        if(!response.ok) {
            //Throws An Error With The Status Text Of The Response.
            throw new Error(response.statusText);
        }

        //Parses The Body Of The Response As JSON. Waits For Completion.
        const data = await response.json();

        //Return The Data.
        return data;
    } catch (error) {
        throw new Error(error);
    } finally {
        //Nothing Needs To Be Done. Included For Clairty.
    }
}