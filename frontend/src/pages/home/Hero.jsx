import React from 'react'

import card1 from '../../assets/card-1.png'
import card2 from '../../assets/card-2.png'
import card3 from '../../assets/card-3.png'

const cards=[
    {
        id:1,
        image:card1,
        trend:'2025 Trend',
        title:'Handicrafts'
    },
    {
        id:2,
        image:card2,
        trend:'2025 Trend',
        title:'Food & Beverages'
    },
    {
        id:3,
        image:card3,
        trend:'2025 Trend',
        title:'Clothing & Fashion'
    },
    {
        id:3,
        image:card3,
        trend:'2025 Trend',
        title:'Electronics'
    },

]
const Hero = () => {
  return (
    <section className='section__container hero__container overflow-hidden'>
      {
        cards.map((card) => (
            <div className='animate-marquee flex space-x-14 items-center justify-between ' key={card.id}> 
                <img src={card.image} alt={card.title} />
                <div className='hero__content'>
                <p>{card.trend}</p>
                <h4>{card.title}</h4>
                <a href="#">Discover More</a>
                </div>
            </div>
        ))
      }
    </section>
  )
}

export default Hero
