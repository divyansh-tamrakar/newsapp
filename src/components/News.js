import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
    static defaultProps ={
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes ={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,


    }
    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount(){
        this.setState({loading: true})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=221654f1c2424239af9c0f379e3b6076&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        let parsedData = await data.json()
        // this.articles = parsedData.articles
        // console.log(parsedData.articles)

        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,
        loading: false})
    }
    handleNextClick = async () =>{
        this.state.loading = true
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            this.setState({loading: true})

            console.log("Clicked Next")
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=221654f1c2424239af9c0f379e3b6076&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            let data = await fetch(url)
            let parsedData = await data.json()
            // this.articles = parsedData.articles
            // console.log(parsedData.articles)
            this.setState({articles: parsedData.articles,
                page: this.state.page+1, 
                loading: false
            })
            
        }
    }

    handlePrevClick = async () => {
        this.setState({loading: true})

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=221654f1c2424239af9c0f379e3b6076&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        let parsedData = await data.json()
        // this.articles = parsedData.articles
        // console.log(parsedData.articles)
        this.setState({articles: parsedData.articles,
            page: this.state.page-1,
            loading: false
        })
    }

    convertDate = (milliseconds) =>{
        let hours = Math.floor(milliseconds/(1000*60*60))
        // let minutes = Math.floor(hours/(1000*60))
        let nowTime = Date.now()
        // console.log(nowTime)
        let nowHours = Math.floor(nowTime/(1000*60*60))
        // let nowMinutes = Math.ceil(nowHours/(1000*60))
        let diff = nowHours - hours
        if(diff > 24) {
            return `${Math.floor(diff/24)} days ago`
        }
        return `${nowHours - hours}hrs ago`
    }
    render() {
        return (
            <div className="container my-3">
                <h1 className='text-center'>News Monkey's Top headlines</h1>
                <br />
                {this.state.loading && <Spinner />}
                <div className="row">
                {!this.state.loading && this.state.articles.map((element)=> {
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title!==null?element.title.slice(0, 30):element.title}
                        description={element.description!==null?element.description.slice(0, 50):"Click to read more"} 
                        imageURL={element.urlToImage!==null ? element.urlToImage:'https://media.istockphoto.com/id/177766582/photo/blank-newspaper-headline-template.jpg?s=612x612&w=0&k=20&c=d41DheIvLxstJrqPrDQrhRG0BAbgObCwx784u-VmOJk='}
                        newsUrl={element.url} source={element.source.name} author={element.author? element.author: 'Unknown Author'} publishedAt={this.convertDate(Date.parse(element.publishedAt))}/>
                    </div>
                })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
