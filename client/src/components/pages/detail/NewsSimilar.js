import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

import BoxLoadingItem from "../../BoxLoadingItem";
import { hanldeUrlPretty } from "../../mixin/UrlPretty";

export default function NewsSimilar(props) {
  const [datas, setDatas] = React.useState([]);
  const id = props.id;

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/news/similar/${id}`);

      setDatas(res.data.data);
    };

    fetchData();
  }, [id]);

  return (
    <div className="col-lg-8 p-0">
      <h3 className="mb-3 mt-3">Tin tức tương tự</h3>
      {datas
        ? datas.map((data, index) => (
          <Link to={`/${hanldeUrlPretty(data.title)}/${data._id}`} key={index} className="other-new p-3 bg-white rounded text-decoration-none">
            <div className="other-new__image border border-secondary">
              <img
                src={data.content === "" ? data.articlePicture : `/uploads/news/${data.articlePicture}`}
                alt={data.title}
              />
            </div>
            <div className="other-new__info">
              <h4 className="other-new__title">{data.title}</h4>
              <i className="mdi mdi-av-timer" /> {moment(data.dateCreate).format("DD-MM-YYYY")} -{" "}
              <i className="mdi mdi-eye" /> {data.view}
              {data.source && (<span className="news-source-title"> Nguồn: {data.source}</span>)}
            </div>
          </Link>
        ))
        : (<BoxLoadingItem />)}
    </div>
  )
}
