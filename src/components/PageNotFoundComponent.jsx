
import React from 'react'
import { FooterComponent } from './FooterComponent'

const PageNotFound = () => {
    return (
        <div>
            <div id="wrapper">
                <div id="info">
                    <h3 style={{
                        marginTop: "20.5rem",
                        textAlign: "center",
                        color: "navy"
                    }}>This page could not be found</h3>
                </div>
            </div >
            <FooterComponent />
        </div>
    )
}

export default PageNotFound