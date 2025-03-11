import React from 'react'

const HeaderSp = ({title}) => {
    return (
		<header className='bg-white bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-300'>
			<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
				<h1 className='text-2xl font-semibold'>{title}</h1>
			</div>
		</header>
	);
}

export default HeaderSp