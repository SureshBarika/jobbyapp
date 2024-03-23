import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const componentStatus = {
  inesitial: 'inetial',
  loader: 'Loading',
  successComponent: 'Success',
  failComponent: 'Fail',
}

class Profile extends Component {
  state = {
    profileDetails: {},
    fetchStatus: componentStatus.inesitial,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({
      fetchStatus: componentStatus.loader,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const filteredata = {
        name: data.profile_details.name,
        shortBio: data.profile_details.short_bio,
        profileImageUrl: data.profile_details.profile_image_url,
      }
      this.setState({
        profileDetails: filteredata,
        fetchStatus: componentStatus.successComponent,
      })
    } else {
      this.setState({
        fetchStatus: componentStatus.failComponent,
      })
    }
  }

  renderRetry = () => (
    <div className="err-profile">
      <button type="button" className="home-btns" onClick={this.getDetails}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="err-profile">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderProfile = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails

    return (
      <div className="profile-cont">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h2 className="name">{name}</h2>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  renderByStatus = status => {
    switch (status) {
      case 'Fail':
        return this.renderRetry()
      case 'Success':
        return this.renderProfile()
      case 'Loader':
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {fetchStatus} = this.state
    return (
      <div className="profile-main-cont">
        {this.renderByStatus(fetchStatus)}
      </div>
    )
  }
}

export default Profile
