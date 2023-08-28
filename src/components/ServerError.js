import React from 'react'
import serverImg from '../components/document.png'

const ServerError = () => {
    return (
        <div>
            <div className="container">
               <div className="mainContent d-flex justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-md-12">
                        <div className="textContent mx-sm-3">
                                <div className="serverImg">
                                    <img src={serverImg} alt="" />
                                </div>
                                <h3 className='my-4'>This site isn't working</h3>
                                <h5 className='my-2'><b>noteX</b> is currently unable to handle your request</h5>
                                <h6>Internal Server Error</h6>
                            </div>
                        </div>
                    </div>
               </div>  
            </div>
        </div>
    )
}

export default ServerError
