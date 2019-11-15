import React, { Component } from 'react'
import TechItem from './TechItem'

export default class TechList extends Component {
  state = {
    techs: [],
    newTech: '',
  }

  componentDidMount() {
    const lsTechList = JSON.parse(localStorage.getItem('techList'))

    if (lsTechList) this.setState({ techs: [ ...lsTechList ] })
  }

  componentDidUpdate(_, prevState) {
    const { techs } = this.state

    if (prevState.techs !== techs) localStorage.setItem('techList', JSON.stringify(techs))
  }

  handleInputChange = e => {
    this.setState({ newTech: e.target.value })
  }

  handleAddTech = (e) => {
    e.preventDefault()

    const { techs, newTech } = this.state;

    if (newTech) {
      this.setState({
        techs: [ ...techs, newTech ],
        newTech: '',
      })
    }
  }

  handleDeleteTech = tech => {
    const { techs } = this.state;

    this.setState({
      techs: techs.filter(item => tech !== item)
    })
  }

  render() {
    const { techs, newTech } = this.state;

    return (
      <form onSubmit={this.handleAddTech}>
        <ul>
          {techs.map(tech => (
            <TechItem
              key={tech}
              tech={tech}
              handleDeleteTech={() => this.handleDeleteTech(tech)}
            />
          ))}
        </ul>

        <input type="text" value={newTech} onChange={e => this.handleInputChange(e)} />

        <button type="submit">Adicionar</button>
      </form>
    )
  }
}
