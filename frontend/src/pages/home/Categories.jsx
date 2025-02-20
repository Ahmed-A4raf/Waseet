import React from 'react'
import category1 from '../../assets/category-1.jpg'
import category2 from '../../assets/category-2.jpg'
import category3 from '../../assets/category-3.jpg'
import category4 from '../../assets/category-4.jpg'
import category5 from '../../assets/category-1.jpg'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories =[
        {name:'Handicrafts',path:'handicrafts',image: category1},
        {name:'Food & Beverages',path:'food',image: category2},
        {name:'Clothing & Fashion',path:'clothing',image: category3},
        {name:'Automobiles & Transport ',path:'automobiles',image: category4},
        {name:'Electronics ',path:'electronics',image: category5},
    ]
  return (
    <>
    <div className='product__grid'>
        {
        categories.map((category) => (
            <Link key={category.name} to={`/categories/${category.path}`}className='categories__card'>
              <div className="relative mx-auto w-fit">
              <div className="absolute inset-0 rounded-full border-8 border-white animate-pulse"></div>
              <img src={category.image} alt={category.name} className='w-full h-full object-cover' />
              </div>
               
                <h4>{category.name}</h4>
            </Link>
        ))
    }
    </div> 
    </>
  )
}

export default Categories
