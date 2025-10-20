import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/auth";
import { useState } from "react";

function Register(){
    const { register, loading } = useAuth();
    const [fullname, setfullname] = useState('');
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            await register(fullname,email, pass);
            navigate("/Login");
        }catch (error) {
            alert(error);
        }
    }
    return(
        <>
        <div className="register">
            <div className="register__form">
                <form onSubmit={handleSubmit}>
                    <h2>Register Quiz</h2>
                    <div className="register__form-input">
                    
                    <input placeholder="Fullname" type="text" required
                    value={fullname}
                    onChange={(e) => setfullname(e.target.value)}
                    />
                    <input placeholder="Email" type="email" required
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    />
                    <input placeholder="Password" type="password" required
                    value={pass}
                    onChange={(e) => setpass(e.target.value)}
                    />
                    </div>
                    <div className="resister__form-navlink">
                    <button type="submit" className="navlinks" disabled={loading}>
                                {loading ? "Loading..." : "Register"}
                            </button>
                    </div>
                </form>
            </div>
        </div>
        
        </> 
    )
}
export default Register;