import React from 'react';
import Search from './Search.jsx';
import axios from 'axios';
import '../ratings&reviews/Styles/ratings-reviews.scss';
import './q-and-a.scss';

class QuestionsAndAnswers extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() { this.props.getQuestions() }

    handleChange(e) { this.setState({ [e.target.id]: e.target.value }) }

    postQuestion(body) {
        axios.post('/qa/questions/', body)
            .then(() => this.props.getQuestions())
            .catch((err) => console.log('Error adding question ', err));
    }

    postAnswer(body, id) {
        axios.post(`/qa/questions/${id}/answers`, body)
            .then(() => this.props.getQuestions())
            .catch((err) => console.log('Error adding answer ', err));
    }


    render() {
        return (
            <div>
                <h3>QUESTIONS & ANSWERS</h3>
                <Search
                    questions={this.props.questions}
                    productID={this.props.productID}
                    productInfo={this.props.productInfo}
                    postQuestion={this.postQuestion.bind(this)}
                    postAnswer={this.postAnswer.bind(this)}
                />
            </div>
        );
    }
}

export default QuestionsAndAnswers;
