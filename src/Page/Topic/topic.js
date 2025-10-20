import { useEffect, useState } from "react";
import { getTopic } from "../../service/topicService";
import { NavLink } from "react-router-dom";

function Topic() {
    const [Topics, setTopics] = useState([]);
    useEffect(() => {
        const Calltopic = async () => {
            const data = await getTopic('topics');
            setTopics(data);
        }
        Calltopic();
    }, []);
    return (
        <>
            <div className="topic">
                <h2>Danh sách chủ đề ôn tập</h2>
                <table>
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Danh sách chủ đề
                            </th>
                            <th>
                                Làm lại
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Topics.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td><NavLink to={`/Excerse/${item.id}`} className={'navlinks_private'}>Excerse</NavLink></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Topic;