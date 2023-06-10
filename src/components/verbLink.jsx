import { Link } from "react-router-dom";

import "../css/link-btn-card.css";

const verbLink = ({ type }) => {
  let num = Math.random() * 20 + 360;
  // console.log(num);
  return (
    <div className="col-md text-center link-btn-card font-weight-bold">
      <Link to={"/p/" + type.type}>
        {/* <div className="card">
          <img
            src={`https://picsum.photos/500/${Math.round(num)}.jpg`}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <p className="card-text fs-4">{name}</p>
          </div>
          <div className="card-text-desplegable card-text text-p-sm mb-3">
            DESCRIPCION POENR
          </div>
        </div> */}

        <div className="col-md text-center link-btn-card font-weight-bold">
          <a href="./past/">
            <div className="card">
              <img
                src={`https://picsum.photos/500/${Math.round(num)}.jpg`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text fs-4">{type.type}</p>
              </div>
              <div className="card-text-desplegable card-text text-p-sm mb-3">
                {type.descripcion? type.descripcion: "Sin descripcion"}
              </div>
            </div>
          </a>
        </div>
      </Link>
    </div>
  );
};

export default verbLink;
