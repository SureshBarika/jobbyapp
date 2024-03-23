import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp, IoBriefcaseSharp} from 'react-icons/io5'

import './index.css'

const JobItem = props => {
  const {job} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    location,
    rating,
    jobDescription,
    packagePerAnnum,
  } = job
  const navigateurl = `/jobs/${id}`

  return (
    <Link to={navigateurl} className="link">
      <li className="job-item">
        <div className="company-logo-cont">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
          <h4>{packagePerAnnum}</h4>
        </div>
        <hr className="line" />
        <h3>Description</h3>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
