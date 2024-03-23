import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const JobsListStatus = {
  inital: 'Initeal',
  prossing: 'Prossing',
  success: 'Success',
  fail: 'Failure',
}

class Jobs extends Component {
  state = {
    jobTypes: [],
    expectedSalary: '0',
    search: '',
    jobsList: [],
    jobsListComponentStatus: JobsListStatus.inital,
  }

  componentDidMount() {
    this.getJobsList()
  }

  toggleJobType = id => {
    const {jobTypes} = this.state
    const isIncludes = jobTypes.find(item => item === id)

    let updatedjobsLis = []
    if (isIncludes) {
      updatedjobsLis = jobTypes.filter(item => item !== id)
    } else {
      updatedjobsLis = [...jobTypes, id]
    }

    this.setState(
      {
        jobTypes: updatedjobsLis,
      },
      this.getJobsList,
    )
  }

  updateSalary = id => {
    this.setState(
      {
        expectedSalary: id,
      },
      this.getJobsList,
    )
  }

  typeFilter = lis => {
    const {employmentTypeId, label} = lis
    const updateJobType = () => {
      this.toggleJobType(employmentTypeId)
    }

    return (
      <li>
        <input
          className="input-filter"
          onChange={updateJobType}
          type="checkbox"
          id={employmentTypeId}
        />
        <label className="filter-name " htmlFor={employmentTypeId}>
          {label}
        </label>
      </li>
    )
  }

  salaryFilter = lis => {
    const {label, salaryRangeId} = lis
    const updateSalaryRange = () => {
      this.updateSalary(salaryRangeId)
    }
    return (
      <li>
        <input
          className="input-filter"
          onChange={updateSalaryRange}
          type="radio"
          name="salary"
          id={salaryRangeId}
        />
        <label htmlFor={salaryRangeId} className="filter-name">
          {label}
        </label>
      </li>
    )
  }

  updateSearch = event => {
    this.setState(
      {
        search: event.target.value,
      },
      this.getJobsList,
    )
  }

  getJobsList = async () => {
    this.setState({
      jobsListComponentStatus: JobsListStatus.prossing,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {search, expectedSalary, jobTypes} = this.state
    const searchJobs = jobTypes.join(',')

    const url = `https://apis.ccbp.in/jobs?search=${search}&employment_type=${searchJobs}&minimum_package=${expectedSalary}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const filtredData = data.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        rating: job.rating,
        title: job.title,
        id: job.id,
        location: job.location,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        packagePerAnnum: job.package_per_annum,
      }))
      this.setState({
        jobsList: filtredData,
        jobsListComponentStatus: JobsListStatus.success,
      })
    } else {
      this.setState({
        jobsListComponentStatus: JobsListStatus.fail,
      })
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoJobComponent = () => (
    <div className="job-list-failure-view-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-view-img"
      />
      <h1 className="fail-hed">No Jobs Found</h1>
      <p className="fail-pera">We could not find any jobs. Try other filters</p>
    </div>
  )

  renderSuccessComponent = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list">
        {jobsList.map(job => (
          <JobItem job={job} key={job.id} />
        ))}
      </ul>
    )
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    const listLength = jobsList.length

    return listLength > 0
      ? this.renderSuccessComponent()
      : this.renderNoJobComponent()
  }

  renderFailComponent = () => (
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
      <button onClick={this.getJobsList} className="home-btns" type="button">
        Retry
      </button>
    </div>
  )

  renderComponent = status => {
    switch (status) {
      case JobsListStatus.prossing:
        return this.renderLoader()
      case JobsListStatus.success:
        return this.renderJobsList()
      case JobsListStatus.fail:
        return this.renderFailComponent()
      default:
        return null
    }
  }

  render() {
    const {jobsListComponentStatus} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect path="/login" />
    }
    return (
      <div className="jobs-main-cont">
        <Header />
        <div className="jobs-view-cont">
          <div className="left-cont">
            <div className="mb-input-cont">
              <input
                type="search"
                placeholder="search"
                className="input-search"
                onBlur={this.updateSearch}
              />
              <button
                type="submit"
                className="search-btn"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />{' '}
              </button>
            </div>
            <Profile />
            <hr className="line" />
            <div className="jobs-filter-cont">
              <h3 className="filters-hed">Type of Employment</h3>
              <ul className="jobs-filter">
                {employmentTypesList.map(lis => this.typeFilter(lis))}
              </ul>
            </div>
            <hr className="line" />
            <div className="jobs-filter-cont">
              <h3 className="filters-hed">Salary Range</h3>
              <ul className="jobs-filter">
                {salaryRangesList.map(lis => this.salaryFilter(lis))}
              </ul>
            </div>
          </div>
          <div className="right-cont">
            <div className="pc-input-cont">
              <input
                type="search"
                placeholder="search"
                className="input-search"
                onBlur={this.updateSearch}
              />
              <button
                type="submit"
                className="search-btn"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />{' '}
              </button>
            </div>

            <div className="jobs-list-cont">
              {this.renderComponent(jobsListComponentStatus)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
