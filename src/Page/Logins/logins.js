import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/auth";
import { useState } from "react";

function Login() {
    const { login, loading } = useAuth();
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, pass);
            navigate("/Homes");
        } catch (err) {
            alert(err);
        }
    }
    return (
        <>
            <div className="login">
                <div className="login__form">
                    <form onSubmit={handleSubmit}>
                        <h2>Login Quiz</h2>
                        <div className="login__form-input">
                            <input placeholder="Email" type="email" required
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                            <input placeholder="Password" type="password" required
                                value={pass}
                                onChange={(e) => setpass(e.target.value)}
                            />
                        </div>
                        <div className="login__form-btn">
                            <button type="submit" className="navlinks" disabled={loading}>
                                {loading ? "Loading..." : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;