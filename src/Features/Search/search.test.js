import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { searchSlice } from './searchSlice';
import { render, fireEvent, screen } from '@testing-library/react'; 
import { MemoryRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

describe('Successfully Searches For A Pokemon', () => {
    it('Correctly Updates The State In Store', () => {
        // SETUP

        // Sets The Search Term We Want To Use For The Search
        const searchTerm = 'oshawott';

        // Mocks The Search Container For Our Use
        const MockSearchContainer = () => {
            // Get dispatch from Redux
            const dispatch = useDispatch(); 

            // Mocks HandleSubmission
            function handleSubmission(event) {
                event.preventDefault(); // Prevent the default form submission
                // Creates A FormData Object To Access Data From The Form
                const formData = new FormData(event.target);

                // Grabs Search Term
                const searchTerm = formData.get('searchbar');

                // Updates The State
                dispatch(searchSlice.actions.setSearchTerm(searchTerm));
            }

            return (
                <form onSubmit={handleSubmission}>
                    <input type='text' placeholder='Enter Pokemon Name' name='searchbar' />
                    <button type='submit'>Search</button>
                </form>
            );
        };

        // Configures A Store For Us To Use
        const store = configureStore({
            reducer: {
                search: searchSlice.reducer,
            },
        });

        // Renders The Store with the component inside the Provider and MemoryRouter
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MockSearchContainer />
                </MemoryRouter>
            </Provider>
        );

        // Finds The Elements We Want To Mock Interaction With
        const searchInput = screen.getByPlaceholderText('Enter Pokemon Name');
        const submitButton = screen.getByText('Search');

        // EXECUTION

        // Mocks User Input For The Search Term
        fireEvent.change(searchInput, { target: { value: searchTerm } });

        // Simulates Button Click For Submitting Search
        fireEvent.click(submitButton);

        // ASSERTION

        // Verify that the store state has been updated with the search term
        expect(store.getState().search.searchTerm).toBe(searchTerm);

        //TEARDOWN
        // NO Teardown Required Because No Other Test Are Required.
    });
});
