import React from 'react'

// ! need to add same props inside the Const
const ReviewsCard = () => {
    // ! Future work
    // const reviews = productReview || [];
  return (
    <div className='my-6 bg-white p-8'>
      <div>
        {/* future work */}
        {/* reviews.length > 0 ? (<div></div>) : <p>No Reviews Yet</p> */}

        <div>
            <h3 className='text-lg font-medium'>
                All Comments...
            </h3>
            <div>
                {
                    // future work
                    // reviews.map((review, index) => (
                    //     <div key={index} className='mt-4 '>
                    //         <div>
                    //             <img src="" alt="" />
                    //         </div>
                    //     </div>
                    // )
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewsCard
