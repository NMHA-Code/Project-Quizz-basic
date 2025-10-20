import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/auth";
import '../../style/LayoutPrivate.scss'
function Homes() {
    const { token } = useAuth();
    return (
        <>
            {token ? (
                <>
                    <div className="home">
                        <p>
                            Chào mừng bạn đã đăng nhập thành công
                        </p>
                        <div className="home__list">
                            <NavLink to={'/Topic'} className={'navlinks_private'}>Danh sách chủ đề ôn luyện</NavLink>
                            <NavLink to={'/Answer'} className={'navlinks_private'}>Danh sách bài đã luyện tập</NavLink>
                        </div>
                        <div className="home__info">
                            <p>
                                Website trắc nghiệm online lập trình Frontend là một trang thi trực tuyến cho phép các lập trình viên Frontend thực hiện các bài kiểm tra, trắc nghiệm để đánh giá và đo đạc kiến thức đã luyện tập.
                            </p>
                            <p>
                                Đối với các lập trình viên Frontend, website thi nghiệm online cung cấp các bài kiểm tra giúp người dùng luyện tập, ôn thi, đánh giá khả năng của mình trong các công nghệ và công cụ lập trình như:
                                HTML, CSS, JavaScript, jQuery, Bootstrap
                                ,Angular
                                ,React
                                ,Vue
                            </p>
                        </div>

                    </div>
                </>
            ) : (
                <>
                    <h1>Please sign in</h1>
                </>
            )}

        </>
    )
}
export default Homes;