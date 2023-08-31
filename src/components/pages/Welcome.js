import pictures from "../../data/pictures";
import {useEffect, useState} from "react";

const Welcome = (props) => {
    const [index, setIndex] = useState(0);
    const intervalCallback =() =>{
        setIndex((prevIndex)=>{
            return ((prevIndex +1)%pictures.length)
        })
    }
    useEffect(()=>{
        setInterval(intervalCallback,3000)
    },[])
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-6">
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={pictures[index].image} className="d-block w-100" alt="..."/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-12 d-flex justify-content-center">
                    <div>
                        <h1 className="text-center mb-3">Welcome to lucky web application</h1>
                        <p className="text-center mb-3">In this page, you will learn how to be lucky and successful, and
                            how to get a lot of money.</p>
                        <p className="text-center">The only secret for approaching to this target, changing your mind
                            and want</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Welcome;