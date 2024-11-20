import videoHomePage from '../../assets/video-homepage.mp4'
import { useSelector } from 'react-redux' //hook cua redux , giup lay ra state cua redux
import { useNavigate } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next';

const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    const navigate = useNavigate()
    const { t } = useTranslation();

    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source
                    src ={videoHomePage}
                    type='video/mp4'
                />
            </video>
            <div className='homepage-content'>
                <div className='title-one'>
                    {t('homepage.title1')}
                </div>
                <div className='title-two'>
                    {t('homepage.title2')}
                </div>
                <div className='title-three'>
                    {isAuthenticated === false ? 
                        <button onClick={() => navigate("/login")}>
                            {t('homepage.title3.login')}
                        </button>    
                        :
                        <button onClick={() => navigate("/users")}>
                            {t('homepage.title3.user')}
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}
export default HomePage