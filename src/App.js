import React, { Component } from 'react'
import SerieCard from './SerieCard'
import Header from './Header'
import Footer from './Footer'
import cssStyles from './App.module.css'
import {
  debounce
} from './helpers/utils'
import queryString from 'query-string'
import {
  filter as filterHelper,
  sorting as sortingHelper
} from './helpers/settings'

const defaultSource = 'imdb'
const defaultState = {
  filter: '',
  sorting: '',
  show: '',
  source: '',
  overlay: ''
}

const {
  location,
  history
} = window
const readQs = () => queryString.parse(location.search)

class App extends Component {
  constructor (props) {
    super(props)
    this.actions = {
      setSorting: this.setSorting.bind(this),
      setFilter: this.setFilter.bind(this),
      setShow: this.setShow.bind(this),
      setSource: this.setSource.bind(this),
      setOverlay: this.setOverlay.bind(this)
    }

    this.state = {
      ...defaultState,
      ...readQs()
    }

    this.filteredSeries = this.filteredSeries.bind(this)
    this.debouncedSetState = debounce(this.setState, 50)

    if (history.pushState) {
      window.onpopstate = () => {
        this.setState({
          ...defaultState,
          ...readQs()
        })
      }
    }
  }

  filteredSeries () {
    const {
      series
    } = this.props

    const {
      filter,
      sorting,
      show,
      source
    } = this.state

    const filteredSerie = filter ? filterHelper(series, filter) : series
    const sorter = sortingHelper[sorting]
    return (sorter)
      ? sorter(filteredSerie, source || defaultSource, !show)
      : filteredSerie
  }

  buildUrl (newState) {
    const qs = queryString.stringify({
      ...readQs(),
      ...newState
    })

    return `${location.origin}/${qs ? `?${qs}` : ''}`
  }

  setShow (show) {
    const newState = { show }
    if (history.pushState) history.pushState({}, '', this.buildUrl(newState))
    this.setState(newState)
  }

  setSorting (sorting) {
    const newState = { sorting }

    if (history.pushState) history.pushState({}, '', this.buildUrl(newState))
    this.setState(newState)
  }

  setFilter (filter) {
    filter = filter || undefined
    const newState = { filter }

    if (history.pushState) history.pushState({}, '', this.buildUrl(newState))
    this.debouncedSetState(newState)
  }

  setSource (source) {
    source = source || undefined
    const newState = { source, overlay: undefined }

    if (history.pushState) history.pushState({}, '', this.buildUrl(newState))
    this.setState(newState)
  }

  setOverlay (overlay) {
    overlay = overlay || undefined
    const newState = { overlay }

    if (history.pushState) history.pushState({}, '', this.buildUrl(newState))
    this.setState(newState)
  }

  render () {
    const filteredSeries = this.filteredSeries()

    return (
      <div className={cssStyles.page}>
        <Header {...this.state} {...this.actions} />
        <main className={cssStyles.container}>
          {filteredSeries.map((serie) => (
            <SerieCard
              overlay={this.state.overlay}
              source={this.state.source || defaultSource}
              trilogy={!this.state.show}
              key={serie.title}
              serie={serie} />
          ))}
        </main>
        <Footer updatedAt={this.props.updatedAt} />
      </div>
    )
  }
}

export default App
