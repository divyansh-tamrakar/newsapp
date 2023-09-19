import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewsItem extends Component {
    

    render() {
        var {title, description, imageURL, newsUrl, publishedAt} = this.props
        return (
            <div className='my-3'>
                <div className="card" >
                    <img src={imageURL} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a href={newsUrl} target='_blank' className="btn-sm btn btn-dark">Read more</a>
                        <p><strong>{publishedAt}</strong></p>
                    </div>
                    </div>
            </div>
        )
    }
}
