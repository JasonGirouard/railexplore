import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const GoogleAnalytics = () => {
  useEffect(() => {
    ReactGA.initialize('G-K8KTLE1LDF');
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, []);

  return null;
};

export default GoogleAnalytics;