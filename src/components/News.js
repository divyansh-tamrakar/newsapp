import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

	const [articles, setArticles] = useState([])
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [totalResults, setTotalResults] = useState(0)

	// document.title = `News Monkey - ${this.capitalize(props.category)}`;

	const capitalize = (string) =>{
		return string[0].toUpperCase() + string.slice(1);
	};

	const updateNews = async () => {
		setLoading(true)
		props.setProgress(10)
		const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
		let data = await fetch(url);
		props.setProgress(40)
		let parsedData = await data.json();
		props.setProgress(70)
		setArticles(parsedData.articles)
		setTotalResults(parsedData.totalResults)
		setLoading(false)
		props.setProgress(100)
	}

	useEffect(() => {
		document.title = `News Monkey - ${capitalize(props.category)}`
	  	updateNews()
	}, [])
	
	const fetchMore = async () => {
		
		const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
		setPage(page + 1 );
		let data = await fetch(url);
		let parsedData = await data.json();
		// this.articles = parsedData.articles
		// console.log(parsedData.articles)
		setArticles(articles.concat(parsedData.articles))
		setTotalResults(parsedData.totalResults)
	};

	const convertDate = (milliseconds) => {
		let hours = Math.floor(milliseconds / (1000 * 60 * 60));
		let nowTime = Date.now();
		let nowHours = Math.floor(nowTime / (1000 * 60 * 60));
		let diff = nowHours - hours;
		if (diff > 24) {
			return `${Math.floor(diff / 24)} days ago`;
		}
		return `${nowHours - hours}hrs ago`;
	};
		return (
			<>
			<h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}>
				News Monkey's Top {capitalize(props.category)} headlines{" "}
			</h1>
			<br />
			{loading && <Spinner />}
			<InfiniteScroll
				dataLength={articles.length}
				next={fetchMore}
				hasMore={articles.length !== totalResults}
				loader={<Spinner />}
				
			>
			<div className="container">
				<div className="row">
				{articles.map((element) => {
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
						publishedAt={convertDate(
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

News.defaultProps = {
country: "in",
pageSize: 8,
category: "general",

};

News.propTypes = {
country: PropTypes.string,
pageSize: PropTypes.number,
category: PropTypes.string,
};

export default News