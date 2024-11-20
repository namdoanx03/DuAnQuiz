import { NavDropdown } from "react-bootstrap"
import { useTranslation } from "react-i18next";

const Language = (props) => {

    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language)
    }
    return (
        <div>
            <NavDropdown title={i18n.language === 'vi' ? "Việt Nam" : "English"} id="basic-nav-dropdown2" className='languages'>
                <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>Enghlish</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>Việt Nam</NavDropdown.Item>
            </NavDropdown>
        </div>
    )
}
export default Language