import axios from "axios";
import { useEffect, useState } from "react";
import Dashboard from './Dashboard';
import './Exam.css';

function Exam() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswer] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState(new Map());
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/questions")
            .then(result => {
                setQuestions(result.data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get("http://localhost:3000/answers")
            .then(result => {
                setAnswer(result.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const getSelectedAns = (event, qid, ans) => {
        setSelectedAnswers(prev => new Map(prev).set(qid, ans));
    }

    const submitExam = () => {
        setIsSubmitted(true);
    }

    return (
        <div className="exam-container">
            {isSubmitted ? (
                <Dashboard userAnswers={selectedAnswers} correctAnswers={answers} questions={questions}/>
            ) : (
                <div className="exam-container">
                    <h2 className="exam-title">Online Examination</h2>
                    {questions.map(q =>
                        <div key={q.qid} className="question-container">
                            <p className="question-text">{q.qid}. {q.question} ?</p>
                            <input type="radio" name={q.qid} value={q.ans1} onClick={(event) => {
                                getSelectedAns(event, q.qid, q.ans1);
                            }} />{q.ans1}
                            <input type="radio" name={q.qid} value={q.ans2} onClick={(event) => {
                                getSelectedAns(event, q.qid, q.ans2);
                            }} />{q.ans2}
                            <input type="radio" name={q.qid} value={q.ans3} onClick={(event) => {
                                getSelectedAns(event, q.qid, q.ans3);
                            }} />{q.ans3}
                            <input type="radio" name={q.qid} value={q.ans4} onClick={(event) => {
                                getSelectedAns(event, q.qid, q.ans4);
                            }} />{q.ans4}
                        </div>
                    )}
                    <button className="submit-button" onClick={submitExam}>Submit</button>
                </div>
            )}
        </div>
    );
}

export default Exam;
