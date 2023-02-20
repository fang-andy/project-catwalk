import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import QuestionList from './QuestionList.jsx';

const Search = (props) => {
    const { questions, productID, productInfo, postQuestion, postAnswer } = props;
    const [query, setQuery] = useState('');

    const searchList = (array) => {
        let filtered = [];

        if (query.length >= 3) {
            return questions.filter((question) =>
                question.question_body.toLowerCase().includes(query.toLowerCase()));
        } else {
            return questions;
        }
    }

    return (
        <>
            <div className='search'>
                <input type='text' className='search-bar' value={query}
                    style={{ width: '100%', height: '30px' }}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='  HAVE A QUESTION? SEARCH FOR ANSWERS...' />
                <FaSearch className='icon' />
            </div>
            <div className='question-list-div'>
                <QuestionList
                    questions={searchList(questions)}
                    productID={productID}
                    productInfo={productInfo}
                    postQuestion={postQuestion}
                    postAnswer={postAnswer} />
            </div>
        </>
    )
}

export default Search;