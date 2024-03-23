import './index.css'

const SkillItem = props => {
  const {skill} = props
  const {imageUrl, name} = skill

  return (
    <li className="skill">
      <img src={imageUrl} alt={name} className="skill-img" />
      <h5>{name}</h5>
    </li>
  )
}

export default SkillItem
