import {withRouter, Link} from 'react-router-dom'
import {IoHomeSharp} from 'react-icons/io5'
import {FiLogOut} from 'react-icons/fi'
import {FaBriefcase} from 'react-icons/fa'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const LogoutPage = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-cont">
      <div className="header-pc-view">
        <Link className="link" to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-web-logo"
          />
        </Link>
        <ul className="tabs-cont">
          <Link className="link" to="/">
            <li className="tab">Home</li>
          </Link>
          <Link className="link" to="/jobs">
            <li className="tab">Jobs</li>
          </Link>
        </ul>
        <button onClick={LogoutPage} type="button" className="login-btns">
          Logout
        </button>
      </div>
      <div className="header-mb-view">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-web-logo"
          />
        </Link>
        <div className="tabs-mb-cont">
          <ul className="tabs-cont">
            <Link to="/">
              <li className="tab-mb">
                <IoHomeSharp />
              </li>
            </Link>
            <Link to="/jobs">
              <li className="tab-mb">
                <FaBriefcase />{' '}
              </li>
            </Link>
          </ul>
          <button onClick={LogoutPage} type="button" className="mb-btns">
            <FiLogOut />{' '}
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
