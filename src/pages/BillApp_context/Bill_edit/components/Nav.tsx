import { LeftOutline } from 'antd-mobile-icons'
import './Nav.scss'
type NavPropType = {
    text: string
    onBackClick: () => void
}
function Nav(props: NavPropType) {
    const { text, onBackClick } = props
    return(
        <div className="Nav">
            <div className="leftBack" onClick={onBackClick}>
                <LeftOutline />
            </div>
            <span>{text}</span>
        </div>
    )
}
export default Nav