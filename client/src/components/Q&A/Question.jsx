import React, { useState } from 'react';
import Answer from './Answer.jsx';
import AddAnswer from './AddAnswer.jsx';
import axios from 'axios';

const Question = (props) => {
    const { question, productID, productInfo, postAnswer } = props;
    const [helpfulBtn, setHelpfulBtn] = useState(false);
    const [helpCount, setHelpCount] = useState(question.question_helpfulness);
    const [display, setDisplay] = useState(2);
    const [modal, setModal] = useState(false);

    const handleClick = () => {
        if (helpfulBtn) {
            return;
        }
        axios.put(`/qa/questions/${question.question_id}/helpful`)
            .then(() => setHelpCount((prevState) => prevState + 1))
            .catch((err) => console.log('Error updating ', err));
        setHelpfulBtn(true);
    }

    let answers = [];
    let answerKeys = Object.keys(question.answers);
    for (let i = 0; i < answerKeys.length; i++) {
        answers.push(question.answers[answerKeys[i]]);
    };

    let loadMoreAnswers = answers.length <= 2 ? null : answers.length > display ? <a className='load-answers' style={{ fontWeight: 'bold', cursor: 'pointer', fontSize: 14, margin: 12 }} onClick={() => setDisplay(answers.length)} >SEE MORE ANSWERS</a> : <a className='load-answers' style={{ fontWeight: 'bold', cursor: 'pointer', fontSize: 14, margin: 12 }} onClick={() => setDisplay(2)} >COLLAPSE ANSWERS</a>

    let helpful = <a style={{ textDecorationLine: 'underline' }}>Yes</a>
    return (
        <div className='question'>
            <div className='question-helpful'>
                <span style={{ fontWeight: 'bold' }}> Q: {question.question_body}
                </span>
                <div className='side-options'> Helpful?{'  '}
                    <u style={{ cursor: 'pointer' }}
                        onClick={() => handleClick()}>Yes</u> {'  '}
                    ({helpCount}) |{'  '}
                    <u onClick={(e) => setModal(true)} style={{ cursor: 'pointer' }} >Add Answer</u>
                </div>
                {
                    modal
                    && (
                        <div
                            className="modal-style"
                            onClick={(e) => setModal(false)}
                        >
                            <div
                                className="inner-modal-style"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <span className="close-button" onClick={(e) => setModal(false)}>&times;</span>
                                <AddAnswer
                                    productID={productID}
                                    productInfo={productInfo}
                                    postAnswer={postAnswer}
                                    question={question}
                                />
                                <br />
                            </div>
                        </div>
                    )
                }
            </div>
            {answers.sort((a, b) =>
                a.helpfulness > b.helpfulness ? -1 : 1)
                .slice(0, display).map((answer, index) =>
                    <Answer key={index} answer={answer}
                    />
                )}
            {loadMoreAnswers}
        </div>
    )
}

export default Question;