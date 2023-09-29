import React from 'react'


const NewsItem = (props) => {
    
    var {title, description, imageURL, newsUrl, author, publishedAt, source} = props
    return (
        <div className='my-3'>
            <div className="card" >
                <img src={imageURL} className="card-img-top" alt="..." />
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: 0
                }}>
                    <span className="badge rounded-pill bg-danger">
                        {source}
                    </span>
                </div>
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

export default NewsItem