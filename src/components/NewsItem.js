import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewsItem extends Component {
    

    render() {
        var {title, description, imageURL, newsUrl, author, publishedAt, source} = this.props
        return (
            <div className='my-3'>
                <div className="card" >
                    <img src={imageURL} className="card-img-top" alt="..." />
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex: '1', left: '90%'}}>
                        {source}
                    </span>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text"> {description}...</p>
                        <p className="card-text"><small> By {author} at {publishedAt}</small></p>
                        <a href={newsUrl} target='_blank' className="btn-sm btn btn-dark">Read more</a>
                       
                    </div>
                    </div>
            </div>
        )
    }
}
