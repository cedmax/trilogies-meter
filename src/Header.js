import React, { Component } from 'react'
import cssStyles from './Header.module.css'

export default class Graph extends Component {
  render () {
    const {
      sort,
      sorted,
      show,
      visible
    } = this.props

    return (
      <header className={cssStyles.header}>
        <h1>The Trilogy Meter *</h1>
        <nav className={cssStyles.nav}>
          <small>
            Sort by:
            {' '}<a className={!sorted ? cssStyles.selected : ''} onClick={() => sort()}>default</a>
            {' '}<a className={sorted === 'rating' ? cssStyles.selected : ''} onClick={() => sort('rating')}>avg. rating</a>
            {' '}<a className={sorted === 'year' ? cssStyles.selected : ''} onClick={() => sort('year')}>least recent</a>
            {' '}<a className={sorted === 'year_desc' ? cssStyles.selected : ''} onClick={() => sort('year_desc')}>most recent</a>
          </small>
          <small>
            Tooltips:
            {' '}<a className={!visible ? cssStyles.selected : ''} onClick={() => show()}>posters</a>
            {' '}<a className={visible === 'title' ? cssStyles.selected : ''} onClick={() => show('title')}>titles</a>
          </small>
        </nav>
        <small>* some series might not be trilogies, no matter what who grew in the 80s thinks</small>
      </header>
    )
  }
}
