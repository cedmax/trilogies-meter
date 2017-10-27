import React from 'react'
import cssStyles from './Footer.module.css'

const formatIso = (updatedAt) => updatedAt && (new Date(updatedAt)).toISOString()
const formatReadable = (updatedAt) => updatedAt && (new Date(updatedAt)).toDateString()

export default ({ updatedAt, affiliate }) => (
  <footer className={cssStyles.footer}>
    <p>
      Made by <a rel="noopener noreferrer" target="_blank" href="https://cedmax.com">cedmax</a> in order to win an argument.<br />Ratings from IMDB, last fetched
      <time dateTime={formatIso(updatedAt)}> {formatReadable(updatedAt)}</time>.
    </p>

    <p><small>Marco Cedaro is a participant in the Amazon EU Associates Programme, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to {affiliate.domain}.</small></p>

  </footer>
)
