import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
	// apiKey: process.env.REACT_APP_NEWS_API
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `News Monkey - ${this.capitalize(this.props.category)}`;
  }

  async updateNews() {
    this.setState({ loading: true });
	this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
	this.props.setProgress(40)
    let parsedData = await data.json();
    // this.articles = parsedData.articles
    // console.log(parsedData.articles)
	this.props.setProgress(70)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
	this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMore = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // this.articles = parsedData.articles
    // console.log(parsedData.articles)

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      
    });
  };

  convertDate = (milliseconds) => {
    let hours = Math.floor(milliseconds / (1000 * 60 * 60));
    let nowTime = Date.now();
    let nowHours = Math.floor(nowTime / (1000 * 60 * 60));
    let diff = nowHours - hours;
    if (diff > 24) {
      return `${Math.floor(diff / 24)} days ago`;
    }
    return `${nowHours - hours}hrs ago`;
  };
  render() {
    return (
      <>
        <h1 className="text-center">
          News Monkey's Top {this.capitalize(this.props.category)} headlines{" "}
        </h1>
        <br />
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMore}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          
        >
		<div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={
                      element.title !== null
                        ? element.title.slice(0, 30)
                        : element.title
                    }
                    description={
                      element.description !== null
                        ? element.description.slice(0, 50)
                        : "Click to read more"
                    }
                    imageURL={
                      element.urlToImage !== null
                        ? element.urlToImage
                        : "https://media.istockphoto.com/id/177766582/photo/blank-newspaper-headline-template.jpg?s=612x612&w=0&k=20&c=d41DheIvLxstJrqPrDQrhRG0BAbgObCwx784u-VmOJk="
                    }
                    newsUrl={element.url}
                    source={element.source.name}
                    author={element.author ? element.author : "Unknown Author"}
                    publishedAt={this.convertDate(
                      Date.parse(element.publishedAt)
                    )}
                  />
                </div>
              );
            })}
			
          </div>
		  </div>
        </InfiniteScroll>
      </>
    );
  }
}
