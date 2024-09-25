import React from 'react'
import PageContent from '../components/PageContent'
import Header from '../components/Header'
import { isRouteErrorResponse, useRouteError } from 'react-router'

const Error = () => {

  const error = useRouteError();
  console.log(error)
  if(isRouteErrorResponse(error)){
    return (
      <>
        <Header />
        <div className='text-center'>
          <h1>Oops!</h1>
          <h2>{error.status}</h2>
          <p>{error.statusText}</p>
          {error.data?.message && <p>{error.data.message}</p>}
        </div>
      </>
    ); 
  } else {
      return(
      <>
          <Header />
          <PageContent title="An Error Occurred!" content="Some thing went wrong"/>
      </>
    )
  }
}

export default Error