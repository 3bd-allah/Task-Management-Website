import React from 'react'

const PageContent = ({title, content}) => {
  return (
    <>
        <div className='text-center'>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    </>
  )
}

export default PageContent