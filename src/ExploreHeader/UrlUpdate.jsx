import { useEffect , useContext} from 'react';
import { StationContext } from "../Context/StationContext";
import { OriginStationContext } from "../Context/OriginStationContext";
import { OriginContext } from "../Context/OriginContext";
import { useNavigate, useLocation } from 'react-router-dom';

const UrlUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { activeStation } =
  useContext(StationContext);
const { originStation  } =
  useContext(OriginStationContext);
const { origin } = useContext(OriginContext);

  useEffect(() => {
  //  console.log('IN URL UPDATE')
    if (origin && originStation) {
      const { pathname } = location;
      if (pathname === '/' || pathname === '/explore') {
        //console.log('URL, ORIGIN ID',origin.id, ' originStation: ', originStation.code)
        navigate(`/explore/${origin.id}/${originStation.code}`);
      }
    }
  }, [origin, originStation, navigate]);
};

export default UrlUpdate;