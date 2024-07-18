import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: 'rahul',
    password: 'rahul@2021',
    loginStatus: false,
  }

  successSubmit = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 20})

    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {password, username} = this.state
    const info = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(info),
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      this.successSubmit(data.jwt_token)
    } else {
      this.setState({
        loginStatus: true,
      })
    }
  }

  changeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  changePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const {username, password, loginStatus} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-cont">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-img"
          />
          <form onSubmit={this.submitForm} className="login-form">
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="input"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={this.changeUsername}
            />
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="input"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.changePassword}
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {loginStatus && (
              <p className="errmsg">*Username and Password didn`t match</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
