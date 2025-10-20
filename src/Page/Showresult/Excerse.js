import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../service/topicService";
import { getQuestion } from "../../service/questionService";
import { postAnswer } from "../../service/answerService";
import { useAuth } from "../../auth/auth";

function Excerse() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [Topics, setTopics] = useState([]);
    const [Questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    useEffect(() => {
        const Api = async () => {
            const [rawQuestion, rawTopics] = await Promise.all([
                getQuestion('questions'),
                getTopic('topics')
            ])
            const listQuestions = (rawQuestion || []).filter(i => Number(i.topicId) === Number(id));
            const IdTopic = (rawTopics || []).find(i => Number(i.id) === Number(id));
            setQuestions(listQuestions);
            setTopics(IdTopic);
        }
        Api();
    }, [id]);
    function handleSelect(questionId, optionIndex) {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: optionIndex,
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const allAnswered = Questions.every(q => selectedAnswers[q.id] !== undefined);
        if (!allAnswered) return alert('Vui lòng trả lời hết các câu');

        const answers = Questions.map((q) => {
            const selected = selectedAnswers[q.id];
            return {
                questionId: q.id,
                answer: selected !== undefined ? Number(selected) : null,
            };
        });

        const data = {
            userId: currentUser,
            topicId: Number(id),
            answers: answers,
        };

        try {
            const res = await postAnswer("userAnswers", data);
            const createId = await res.id;
            if (createId) navigate(`/Showanswer/${createId}`)
            else {
                console.warn("Response không có id", res);
                navigate(`/Excerse/${id}`);
            }
        } catch (err) {
            console.error("Lỗi khi gửi answer:", err);
            alert("Gửi bài thất bại, thử lại sau.");
        }
    };
    return (
        <>
            <div className="excerse">
                <h1>Bài Quiz chủ đề: {Topics?.name || "..."}</h1>
                <div className="excerse__question">
                    <form onSubmit={handleSubmit}>
                        {Questions.map((q, qIndex) => (
                            <div key={q.id} className="info">
                                <div className="info__title">
                                    <p>Câu {qIndex + 1}: {q.question}</p>
                                </div>

                                <div className="info__question">
                                    {q.answers.map((a, optionIndex) => {
                                        const name = `answer-${q.id}`;
                                        const idRadio = `q-${q.id}-a-${optionIndex}`;
                                        return (
                                            <div key={optionIndex} className="info__question-item">
                                                <input
                                                    type="radio"
                                                    name={name}
                                                    id={idRadio}
                                                    checked={selectedAnswers[q.id] === optionIndex}
                                                    onChange={() => handleSelect(q.id, optionIndex)}
                                                />
                                                <label htmlFor={idRadio}>{a}</label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        <div className="excerse__submit">
                            <button type="submit" className="navlinks_private">Nộp bài</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
export default Excerse;