import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
export default function Home() {
  return (
    <div>
        <div className='parallax-container parallax22'>
            <div className='section no-pad-bot'>
                <div className='container'>
                    <br/><br/>
                    <h1 className='header center teal-text bob'>Health Tracker</h1>
                    <div className='row center'>
                        <h5 className='header col s12 bob'>Where you can note and track your health history</h5>
                    </div><br/><br/>
                </div>
                <div className='parallax'>
                    <img src='bb.jpeg' alt="" />
                </div>
            </div>
        </div>
        <div className='container'>
            <div className='section'>
                <div className='row'>
                    <div className='col s12 m4'>
                        <Link to="/appointment">
                            <div className='icon-block'>
                                <h2 className='center brown-text'>My</h2>
                                <h5 className='center'>Appointments</h5>
                                <p className='light'>track your appointments, add more and stay aware of your health</p>
                            </div>
                        </Link>
                    </div>
                    <div className='col s12 m4'>
                        <Link to="/record">
                            <div className='icon-block'>
                                <h2 className='center brown-text'>My</h2>
                                <h5 className='center'>Records</h5>
                                <p className='light'>Check the records provided by doctor and follow up with the appointments</p>
                            </div>
                        </Link>
                    </div>
                    <div className='col s12 m4'>
                        <Link to="/medicine">
                            <div className='icon-block'>
                                <h2 className='center brown-text'>My</h2>
                                <h5 className='center'>Medicines</h5>
                                <p className='light'>Check the medicines prescribed by the doctor</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <br/>
            </div>
        </div><br/><br/><br/><br/><br/>
    </div>
  )
}