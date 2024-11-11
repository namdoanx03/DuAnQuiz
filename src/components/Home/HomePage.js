import videoHomePage from '../../assets/video-homepage.mp4'
import { useSelector } from 'react-redux' //hook cua redux , giup lay ra state cua redux
import { useNavigate } from 'react-router-dom'

const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    const navigate = useNavigate()

    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source
                    src ={videoHomePage}
                    type='video/mp4'
                />
            </video>
            <div className='homepage-content'>
                <div className='title-one'>Get up to 3.5x more data about them</div>
                <div className='title-two'>When your forms break the norm, more people fill them out. Think branded designs, video content, and relevant follow-up questions.</div>
                <div className='title-three'>
                    {isAuthenticated === false ? 
                        <button onClick={() => navigate("/login")}>Get's started. It's free</button>    
                        :
                        <button onClick={() => navigate("/users")}>Doing Quiz Now</button>
                    }
                </div>
            </div>
        </div>
    )
}
export default HomePage