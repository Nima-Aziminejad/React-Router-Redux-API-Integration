import {Outlet} from "react-router-dom";
import HomeNavBar from "./HomeNavBar";

function HomeLayout(props){
    return(
        <>
            <HomeNavBar />
            <Outlet />
        </>
    )
}
export default HomeLayout