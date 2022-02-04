import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getLatestNews } from "../../../actions/new.action";
import BoxLoadingItem from "../../BoxLoadingItem";
import { hanldeUrlPretty } from "../../mixin/UrlPretty";

export default function LatestNew() {
  const appState = useSelector(state => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getLatestNews());

  }, [dispatch]);

  const latest = React.useMemo(() => {
    return appState.news.latest;
  }, [appState.news.latest]);

  return (
    <div>
      <h3 className="mb-3">Tin tức mới nhất</h3>
      {
        latest
        ? (
          latest.map((item, index) => {
            let url = `/${hanldeUrlPretty(item.title)}/${item._id}`
            if(item.content == ""){
              return (
                <a href={item.originalLink} className="latest-new p-1 bg-white rounded text-decoration-none text-dark">
                  <div className="latest-new__image">
                    <img
                      src={item.articlePicture}
                      alt={item.title}
                    />
                  </div>
                  <div className="latest-new__info">
                    <h5 className="latest-new__title font-weight">{item.title}</h5>
                  </div>
                </a>
              )
            }
            else
              return (
                <Link to={url} key={index} className="latest-new p-1 bg-white rounded text-decoration-none text-dark">
                  <div className="latest-new__image">
                    <img
                      src={`/uploads/news/${item.articlePicture}`}
                      alt={item.title}
                    />
                  </div>
                  <div className="latest-new__info">
                    <h5 className="latest-new__title">{item.title}</h5>
                  </div>
                </Link>
              )
          })
        )
        : (<BoxLoadingItem />)
      }
    </div>
  );
}
