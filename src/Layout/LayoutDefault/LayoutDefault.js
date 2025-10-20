import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import '../../style/LayoutDefault.scss';
function LayoutDefault(){
    return(
        <>
        <div className="layout">
            <Header/>
            <main className="container">
                <Outlet/>
            </main>
            <Footer/>
        </div>
        </>
    )
}
export default LayoutDefault;