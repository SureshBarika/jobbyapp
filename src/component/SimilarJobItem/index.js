import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp, IoBriefcaseSharp} from 'react-icons/io5'

import './index.css'

const SimilarJobItem = props => {
  const {job, updateList} = props
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
  const url = `/jobs/${id}`

  const updateJobList = () => {
    updateList()
  }

  return (
    <Link onClick={updateJobList} className="link" to={url}>
      <li className="similar-item">
        <div className="company-logo-cont">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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

        <h3>Description</h3>
        <p className="description">{jobDescription}</p>
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
      </li>
    </Link>
  )
}

export default SimilarJobItem
