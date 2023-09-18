import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    
    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount(){
        const url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=221654f1c2424239af9c0f379e3b6076&pageSize=20"
        let data = await fetch(url)
        let parsedData = await data.json()
        // this.articles = parsedData.articles
        // console.log(parsedData.articles)
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
    }
    handleNextClick = async () =>{
        
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){
            console.log("not possible")
        }
        else{
            console.log("Clicked Next")
            const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=221654f1c2424239af9c0f379e3b6076&page=${this.state.page + 1}&pageSize=20`
            let data = await fetch(url)
            let parsedData = await data.json()
            // this.articles = parsedData.articles
            // console.log(parsedData.articles)
            this.setState({articles: parsedData.articles,
                page: this.state.page+1
            })
            
        }
    }

    handlePrevClick = async () => {
        console.log("Clicked Previous")
        const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=221654f1c2424239af9c0f379e3b6076&page=${this.state.page - 1}&pageSize=20`
        let data = await fetch(url)
        let parsedData = await data.json()
        // this.articles = parsedData.articles
        // console.log(parsedData.articles)
        this.setState({articles: parsedData.articles,
            page: this.state.page-1
        })
    }
  render() {
    return (
        <div className="container my-3">
            <h1 className='text-center'>News Monkey's Top headlines</h1>
            <br />
            
            <div className="row">
            {this.state.articles.map((element)=> {
                return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title!==null?element.title.slice(0, 30):element.title}
                     description={element.description!==null?element.description.slice(0, 50):"Click to read more"} 
                    imageURL={element.urlToImage!==null ? element.urlToImage:'https://media.istockphoto.com/id/177766582/photo/blank-newspaper-headline-template.jpg?s=612x612&w=0&k=20&c=d41DheIvLxstJrqPrDQrhRG0BAbgObCwx784u-VmOJk='}
                    newsUrl={element.url}/>
                </div>
            })}
            </div>
            <div className="container d-flex justify-content-between">
                <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        </div>
        
      
    )
  }
}
