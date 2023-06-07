import React from 'react';
import './Dashboard.css';
import { Pie } from 'react-chartjs-2';

function Dashboard({userAnswers, correctAnswers, questions}) {
    let correctCount = 0;
    let incorrectCount = 0;

    questions.forEach((question) => {
        const userAnswer = userAnswers.get(question.qid);
        const correctAnswer = correctAnswers.find(answer => answer.qid === question.qid).correctAns;
        if(userAnswer === correctAnswer) correctCount++;
        else incorrectCount++;
    });

    const data = {
        labels: ['Correct Answers', 'Incorrect Answers'],
        datasets: [{
            data: [correctCount, incorrectCount],
            backgroundColor: ['green', 'red'],
        }]
    };

    return (
   
             <div className="dashboard-container">
            <h2>Dashboard</h2>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div className="chart-container" style={{width: '600px', height: '600px'}}>
                    <Pie data={data} />
                </div>
                <div className="text-evaluation" style={{textAlign: 'left'}}>
                    {questions.map((question, index) => {
                        const userAnswer = userAnswers.get(question.qid);
                        const correctAnswer = correctAnswers.find(answer => answer.qid === question.qid).correctAns;
                        const isCorrect = userAnswer === correctAnswer;
                        return (
                            <div key={index}>
                                <p>{question.question}</p>
                                <p style={{ color: isCorrect ? 'green' : 'red' }}>Your answer: {userAnswer} {isCorrect ? 'Correct' : 'Incorrect'}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
