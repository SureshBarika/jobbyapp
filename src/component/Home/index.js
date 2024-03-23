import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

class Home extends Component {
  routeToJobsComponent = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="home-cont">
        <Header />
        <div className="home-info-cont">
          <h1 className="home-hed">Find The Job That Fits Your Life</h1>
          <p rows={3} className="home-pera">
            Millions Of people are searching for jobs. Salary information,
            company reviews. Find the job fits your ablities and potential
          </p>
          <Link className="link" to="/jobs">
            <button type="button" className="home-btns">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
