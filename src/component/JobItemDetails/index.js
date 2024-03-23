import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import {IoLocationSharp, IoBriefcaseSharp} from 'react-icons/io5'
import {FaExternalLinkAlt, FaStar} from 'react-icons/fa'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SkillItem from '../SkillItem'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const JobItemStatus = {
  initial: 'Initial',
  loading: 'Loading',
  success: 'Success',
  fail: 'Failure',
}

class JobItemDetails extends Component {
  state = {
    componentStatus: JobItemStatus.initial,
    jobDetails: {},
    jobSkills: [],
    similarJobs: [],
    lifeAtCompany: {},
  }

  componentDidMount = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      componentStatus: JobItemStatus.loading,
    })

    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const jobDetailsData = data.job_details
      const lifeAtCompany = {
        description: jobDetailsData.life_at_company.description,
        imageUrl: jobDetailsData.life_at_company.image_url,
      }
      const jobDetails = {
        companyLogoUrl: jobDetailsData.company_logo_url,
        companyWebsiteUrl: jobDetailsData.company_website_url,
        rating: jobDetailsData.rating,
        title: jobDetailsData.title,
        id: jobDetailsData.id,
        location: jobDetailsData.location,
        employmentType: jobDetailsData.employment_type,
        jobDescription: jobDetailsData.job_description,
        packagePerAnnum: jobDetailsData.package_per_annum,
      }

      const jobRequiredSkills = jobDetailsData.skills.map(skill => ({
        imageUrl: skill.image_url,
        name: skill.name,
      }))

      const SimilarJobs = data.similar_jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        rating: job.rating,
        title: job.title,
        id: job.id,
        location: job.location,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
      }))

      this.setState({
        jobDetails,
        lifeAtCompany,
        similarJobs: SimilarJobs,
        jobSkills: jobRequiredSkills,
        componentStatus: JobItemStatus.success,
      })
    } else {
      this.setState({
        componentStatus: JobItemStatus.fail,
      })
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFail = () => (
    <div className="job-list-failure-view-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="fail-hed">Oops! Something went Wrong</h1>
      <p className="fail-pera">
        We cannot seem to find the page you are looking for
      </p>
      <button onClick={this.getJobDetails} className="home-btns" type="button">
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {jobDetails, jobSkills, lifeAtCompany} = this.state

    const {
      title,
      companyLogoUrl,
      employmentType,
      location,
      rating,
      jobDescription,
      packagePerAnnum,
      companyWebsiteUrl,
    } = jobDetails

    return (
      <div className="job-details-item">
        <div className="company-logo-cont">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />
          <div className="company-title-cont">
            <h5 className="title">{title}</h5>
            <div className="rating-icon">
              <FaStar />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-type-cont">
          <div className="location-cont">
            <p>
              {<IoLocationSharp />} {location}
            </p>
            <p>
              {<IoBriefcaseSharp />} {employmentType}
            </p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <div className="company-link">
          <h3>Description</h3>

          <a href={companyWebsiteUrl} className="web-link">
            Visit <FaExternalLinkAlt />
          </a>
        </div>
        <p className="description">{jobDescription}</p>
        <div>
          <h3>Skills</h3>
          <ul className="skills-cont">
            {jobSkills.map(skill => (
              <SkillItem skill={skill} key={skill.name} />
            ))}
          </ul>
        </div>
        <h3>Life at Company</h3>
        <div className="life-at-company">
          <p className="life-pera">{lifeAtCompany.description}</p>
          <img
            src={lifeAtCompany.imageUrl}
            alt="life at company"
            className="life-at-company-img"
          />
        </div>
      </div>
    )
  }

  renderComponentByTheStatus = status => {
    switch (status) {
      case JobItemStatus.loading:
        return this.renderLoader()
      case JobItemStatus.fail:
        return this.renderFail()
      case JobItemStatus.success:
        return this.renderSuccess()
      default:
        return null
    }
  }

  render() {
    const {componentStatus, similarJobs} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect path="/login" />
    }
    return (
      <div className="jobs-main-cont">
        <Header />
        <div className="job-details-main-cont">
          {this.renderComponentByTheStatus(componentStatus)}
          <h1 className="similar-hed">Similar Jobs</h1>
          <ul className="similar-jobs-cont">
            {similarJobs.map(job => (
              <SimilarJobItem
                updateList={this.getJobDetails}
                job={job}
                key={job.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default JobItemDetails
