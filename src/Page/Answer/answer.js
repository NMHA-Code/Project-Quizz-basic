import { useEffect, useState } from "react";
import { getAnswer } from "../../service/answerService";
import { NavLink } from "react-router-dom";
import { getTopic } from "../../service/topicService";
import '../../style/LayoutPrivate.scss'
import { useAuth } from "../../auth/auth";
function Answer(){
    const [Answers, setAnswer] = useState([]);
    const [Topics, setTopics] = useState([]);
    const {users} = useAuth();
    useEffect(()=>{
        const CallAnswer = async () =>{
            const data = await getAnswer('userAnswers');
            const dataTopic = await getTopic('topics');
            setAnswer(data);
            setTopics(dataTopic);
        }
        CallAnswer();
    }, []);
    function findTopic(e){
        const find = Topics.find(i => i.id === e);
        return find.name;
    }
    function findUserID(e){
        const find = users.find(i => i.id === e);
        return find.id;
    }
    return(
        <>
        <div className="answer">
            <h1>Danh sách bài đã luyện tập</h1>
            <table>
                <thead>
                    <tr>
                        <th>
                            User ID
                        </th>
                        <th>
                            Tên chủ đề
                        </th>
                        <th>
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Answers.map(item => (
                        <tr key={item.id}>
                        <td>
{findUserID(item.userId)}
                        </td>
                        <td>
                            {findTopic(item.topicId)}
                        </td>
                        <td>
                            <NavLink to={`/Showanswer/${item.id}`} className={'navlinks_private'}>Xem chi tiết</NavLink>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
        </>
    )
}
export default Answer;