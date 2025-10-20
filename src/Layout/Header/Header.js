import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/auth";
function Header() {
    const { logout } = useAuth();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    }
    return (
        <>

            <div className="header">
                {token ?
                    (
                        <>
                            <h1>Quiz</h1>
                            <div className="header__btn">
                                <NavLink to={'/Homes'} className={({ isActive }) => isActive ? 'header__navlink active' : 'header__navlink'}>Homes</NavLink>
                                <NavLink to={'/Topic'} className={({ isActive }) => isActive ? 'header__navlink active' : 'header__navlink'}>Topic</NavLink>
                                <NavLink to={'/Answer'} className={({ isActive }) => isActive ? 'header__navlink active' : 'header__navlink'}>Answer</NavLink>
                            </div>
                            <div className="header__logout">
                                <button onClick={handleLogout} className={'header__navlink-btn'}>Logout</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1>Quiz</h1>
                            <div className="header__btn">
                                <NavLink to={'/Login'} className={({ isActive }) => isActive ? 'header__navlink active' : 'header__navlink'}>Login</NavLink>
                                <NavLink to={'/Register'} className={({ isActive }) => isActive ? 'header__navlink active' : 'header__navlink'}>Register</NavLink>
                            </div>
                        </>
                    )
                }

            </div>

        </>
    )
}
export default Header;