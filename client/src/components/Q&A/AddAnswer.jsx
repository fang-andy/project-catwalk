import React, { useState } from 'react';

const AddAnswer = (props) => {
    const { productInfo, productID, postAnswer, question } = props;
    const [body, setBody] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photos, setPhotos] = useState({});

    const message = 'You must enter the following: \n';

    const validate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const onSubmit = (e) => {
        e.preventDefault();
        if (!body) {
            alert(`${message} Please add a question`);
            return;
        }
        if (!name) {
            alert(`${message} Please add your nickname`);
            return;
        }
        if (!email || !validate.test((email).toLowerCase())) {
            alert(`${message} Please provide email in the correct format`);
            return;
        }
        postAnswer({ body, name, email }, question.question_id);
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Submit your Answer</h1>
            <h3>{productInfo.name}: {question.question_body} </h3>
            <div>
                <h3 className='ask-headers'>Your Answer* </h3>
                <div className='input-div'>
                    <textarea value={body}
                        className='text-area-body'
                        onChange={(e) => setBody(e.target.value)} maxLength={1000} /> </div>
            </div>
            <div>
                <h3 className='ask-headers'> What is your nickname?* </h3>
                <div className='input-div'>
                    <input type='text' className='ask-inputs' placeholder='Example: jack543!' value={name} onChange={(e) => setName(e.target.value)} maxLength={60} /> </div>
            </div>
            <small>For privacy reasons, do not use your full name or email address</small>
            <div>
                <h3 className='ask-headers'>Your Email* </h3>
                <div className='input-div'>
                    <input type='email' className='ask-inputs'
                        placeholder='Example: jack@email.com' value={email} onChange={(e) => setEmail(e.target.value)} maxLength={60} />
                </div>
            </div>
            <small>For authentication reasons, you will not be emailed</small>
            <br />
            <div>
                <h3 className='ask-headers'>Upload your photos (optional) </h3>
                <div className='input-div'>
                    <input id='photos' type='file' name='filefield' multiple='multiple' onChange={(e) => setPhotos({
                        preview: URL.createObjectURL(e.target.files[0])
                    })}
                    />
                </div>
            </div>
            <input type='submit' className='btn' value='Submit' />
        </form>
    )
}

export default AddAnswer;