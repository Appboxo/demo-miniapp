import React from 'react'

import ScanToSpin from './components/ScanToSpin/ScanToSpin'
import Carousel from './components/Carousel/Carousel'

import './Home.scss'


const Home = (props) => {
  return (
    <section className="pane intro">
      <section className="top-section">
        <ScanToSpin />
      </section>
      <section className="spin-section">
        <Carousel elements={[{}, {}, {}, {}, {}, {}]} />
      </section>
    </section>
  )
}

export default Home
