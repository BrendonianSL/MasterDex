export default function SearchPresentational({ handleSubmission }) {
    return (
        <form onSubmit={handleSubmission}>
            <input type="text" placeholder="Enter Pokemon Name" name = "searchbar" />
            <button type="submit">Search</button>
        </form>
    )
}