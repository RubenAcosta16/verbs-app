import {Link} from 'react-router-dom'

const verbLink = ({name}) => {
  return (
    <div className="col-md text-center link-btn-card font-weight-bold">

    <Link to={"/p/" + name}>

        <div className="card">
          <img
            src="https://picsum.photos/500/360.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <p className="card-text fs-4">{name}</p>
          </div>
          <div className="card-text-desplegable card-text text-p-sm mb-3">
            DESCRIPCION POENR
          </div>
        </div>

      </Link>
    </div>
  );
};

export default verbLink;
