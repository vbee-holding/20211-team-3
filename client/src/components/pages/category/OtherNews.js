import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { hanldeUrlPretty } from "../../mixin/UrlPretty";

export default function OtherNews(tags, newByTag, newsHighlightId, highlightNew) {
   const [tagsOtherNews, setTagsOtherNews] = useState([]);
   const [newByTagOtherNews, setNewByTagOtherNews] = useState([]);

   useEffect(() => {
	  // xủ lý  tin tức trùng lặp
	  if (newsHighlightId && newByTag) {
		 const newByTagOtherNews = newByTag.filter(v => v._id !== newsHighlightId);

		 setNewByTagOtherNews(newByTagOtherNews);
	  }

	  // xủ lý tin tức có tags giống với tin tức nỗi bật
	  if (highlightNew && tags) {
		 const highlightNewTags = highlightNew.tag;

		 if (highlightNewTags) {
			let tagsOtherNews = [];
			const otherNewsTags = tags.filter((tag) => !highlightNewTags.includes(tag));
			setTagsOtherNews(otherNewsTags);
		 }
	  }

   }, [tags, newByTag, newsHighlightId, highlightNew]);

   // just show news <= 50
   newByTagOtherNews.length = 50;

   return(
	  <React.Fragment>
		 {
			tagsOtherNews && (
				  tagsOtherNews.map((tag, index) => (
					 <div className="" key={index}>
						<h3 className="mb-3 mt-3">{tag}</h3>
						{
						   newByTagOtherNews && (
								 newByTagOtherNews.map((item, index) => (
									item.tag.includes(tag) && (
										  <Link to={`/${hanldeUrlPretty(item.title)}/${item._id}`} key={index} className="other-new p-3 bg-white rounded text-decoration-none">
											 <div className="other-new__image border border-secondary">
												<img
												   src={`/uploads/news/${item.articlePicture}`}
												   alt={item.title}
												/>
											 </div>
											 <div className="other-new__info">
												<h4 className="other-new__title">{item.title}</h4>
												<p className="other-new__createby text-secondary"><i className="mdi mdi-monitor" /> {item.createdBy !== null? item.createdBy.username : ""} - <i className="mdi mdi-av-timer" /> {moment(item.dateCreate).format("DD-MM-YYYY")} - <i className="mdi mdi-eye" /> {item.view}</p>
											 </div>
										  </Link>
									   )
								 ))
							  )
						}
					 </div>
				  ))
			   )
		 }
	  </React.Fragment>
   )
}
