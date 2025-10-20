import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getAnswer } from "../../service/answerService";
import { getQuestion } from "../../service/questionService";
import { getTopic } from "../../service/topicService";

function ShowAnswers(){
    const {id} = useParams();
    const [Answer, setAnswer] = useState(null);
    const [Questions, setQuestions] = useState([]);
    const [Topics, setTopics] = useState([]);

    useEffect(()=>{
        const Api = async () => {
            const [rawAnswers, rawQuestions, rawTopics] = await Promise.all([
                getAnswer('userAnswers'),
                getQuestion('questions'),
                getTopic('topics'),
            ]);
            const dataid = rawAnswers.find(i => i.id === Number(id));
            setAnswer(dataid || null);
            setQuestions(rawQuestions || []);
            setTopics(rawTopics || [])
        }
        Api();
    }, [id]);

    if(!Answer) return <p>Không tìm thấy kết quả</p>

    const Topicname = Topics.find(i => i.id === Answer.topicId)?.name || 'Khong ro';
    const totalQuestions = Answer.answers.length;
    const correctQuestions = Answer.answers.filter(ans => {
        const question = Questions.find(i => i.id === Number(ans.questionId));
        return question && Number(question.correctAnswer) === Number(ans.answer);
    }).length;

    const percent =  ((correctQuestions / totalQuestions) * 100).toFixed(0);

    return(
        <div className="result">
            <h1>Kết quả chủ đề: {Topicname}</h1>
            <div className="result__manycheck">
                Đúng: <strong>{correctQuestions}</strong> | Sai: <strong>{totalQuestions - correctQuestions}</strong> | Tổng câu hỏi: <strong>{totalQuestions}</strong> | Phần trăm đúng: <strong>{percent}%</strong>
            </div>

            <div className="result__question">
                {
                    Answer.answers.map((item, qIndex) => {
                        const q = Questions.find(i => i.id === Number(item.questionId));
                        if(!q) return null;

                        // Ép kiểu số để so sánh chính xác
                        const selectedIndex = Number(item.answer);
                        const correctIndex = Number(q.correctAnswer);
                        const questionIsCorrect = selectedIndex === correctIndex;

                        return (
                            <div key={q.id} className="result__question-item">
                                <div className="result__question-item-title">
                                    <p>Câu {qIndex + 1}: {q.question}</p>
                                    {questionIsCorrect ? (
                                        <nav className="title-correct">Đúng</nav>
                                    ) : (
                                        <nav className="title-wrong">Sai</nav>
                                    )}
                                </div>

                                <div className="result__question-item-info">
                                    {q.answers.map((optionText, optionIndex) => {
                                        // gán class cho từng option
                                        let optionClass = "result-color-default";

                                        // nếu đây là option người dùng đã chọn
                                        if (optionIndex === selectedIndex) {
                                            optionClass = questionIsCorrect ? "result-color-green" : "result-color-red";
                                        }
                                        if (optionIndex === correctIndex) {
                                            optionClass += " is-correct";
                                        }

                                        return (
                                            <div key={optionIndex} className="answer-line">
                                                <input
                                                    type="radio"
                                                    checked={optionIndex === selectedIndex}
                                                    readOnly
                                                    disabled
                                                />
                                                <p className={optionClass}>{optionText}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="result__redo">
                <NavLink to={`/Excerse/${Answer.topicId}`} className={'navlinks_private'}>Redo</NavLink>
            </div>
        </div>
    )
}

export default ShowAnswers;
