import videoHomePage from '../../assets/video-homepage.mp4'

const HomePage = (props) => {
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
                    <button>Get's started. It's free</button>
                </div>
            </div>
        </div>
    )
}
export default HomePage