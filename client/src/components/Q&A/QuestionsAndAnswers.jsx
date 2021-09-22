import React from 'react';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';
import axios from 'axios';
import '../ratings&reviews/Styles/ratings-reviews.scss';
import './q-and-a.scss';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // search: '',
      questions: [],
      // disabled: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() { this.getQuestions() }

  // getAnswers() {
  //   this.state.questions.forEach((question) =>
  //     // console.log(question.question_id)
  //     axios.get(`/qa/questions/${question.question_id}/answers`).then((res) => {
  //       // console.log('answers ', res);
  //       this.setState({
  //         answers: res.data.results
  //       });
  //     })
  //   );
  // }

  getQuestions() {
    const { productID } = this.props;
    axios.get('/qa/questions', {
      params: {
        product_id: productID
      }
    })
      .then((res) => {
        // console.log('questions ', res.data);
        this.setState({
          questions: res.data.results,
        })
      })
      .catch((err) => console.log('Error receiving questions ', err));
    // .then(this.getAnswers.bind(this))
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
    // console.log(`${e.target.id}: ${e.target.value}`);
  }

  // doesnt work
  onSearch(query) {
    let filtered = [];
    let allQuestions = this.props.questions;
    if (query.length >= 2) {
      allQuestions = this.props.questions;
      filtered = allQuestions.filter((question) =>
        question.question_body.toLowerCase().includes(query.toLowerCase()));
      // } else {
      //   this.setState({
      //     questions: this.state.questions,
      //   })
    } else if (query === '') {
      filtered = allQuestions;
    }
    this.setState({
      questions: filtered,
      // [e.target.id]: e.target.value
    });
    console.log('filter ', filtered);
    // }
  }

  // putRequest(path, id, endpoint) {
  //   if (this.state.disabled) {
  //     return;
  //   }
  //   axios.put(`/qa/${path}/${id}/${endpoint}`)
  //     .then(() => this.getQuestions())
  //     .then(() => this.setState({ disabled: true }))
  //     .catch((err) => console.log('Error updating ', err));
  // }

  // post request from postman not working...
  postQuestion(body) {
    axios.post('/qa/questions/', body)
      .then(() => this.getQuestions())
      .catch((err) => console.log('Error adding question ', err));
  }

  postAnswer(body, id) {
    axios.post(`/qa/questions/${id}/answers`, body)
      .then(() => this.getQuestions())
      .catch((err) => console.log('Error adding answer ', err));
  }


  render() {
    return (
      <div>
        <h3>QUESTIONS & ANSWERS</h3>
        <Search
          questions={this.state.questions}
          productID={this.props.productID}
          productInfo={this.props.productInfo}
          postQuestion={this.postQuestion.bind(this)}
          postAnswer={this.postAnswer.bind(this)}
           />
        {/* <QuestionList
          questions={this.state.questions}
          productID={this.props.productID}
          productInfo={this.props.productInfo}
          postQuestion={this.postQuestion.bind(this)}
          postAnswer={this.postAnswer.bind(this)}
        /> */}
      </div>
    );
  }
}

export default QuestionsAndAnswers;
