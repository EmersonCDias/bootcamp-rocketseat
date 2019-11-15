import React from 'react'
import PropTypes from 'prop-types'

const TechItem = ({ tech, handleDeleteTech }) => (
  <li>
    {tech}
    <button type="button" onClick={handleDeleteTech}>Deletar</button>
  </li>
)

TechItem.proptypes = {
  tech: PropTypes.string.isRequired,
  handleDeleteTech: PropTypes.string.isRequired,
}

export default TechItem;
