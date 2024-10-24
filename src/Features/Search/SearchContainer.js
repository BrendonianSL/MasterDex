import SearchPresentational from './SearchPresentational';
import { useNavigate } from 'react-router-dom';
export default function SearchContainer() {

    const navigate = useNavigate();
    //Function Responsible For Handling Form Submission
    function handleSubmission({ target }) {
        //Creates A FormData Object To Access Data From The Form
        const formData = new FormData(target);

        //Grabs Search Term From The Form
        const searchTerm = formData.get('searchbar').toLowerCase();

        //Navigate To New Page Using The SearchTerm
        navigate(`/${searchTerm}`);
    }

    return (
        <SearchPresentational handleSubmission={handleSubmission} />
    )
}