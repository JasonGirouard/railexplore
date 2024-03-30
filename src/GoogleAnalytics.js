import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gtag from 'gatsby-plugin-gtag';

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    gtag('config', 'G-K8KTLE1LDF', {
      page_path: location.pathname,
    });
  }, [location]);

  return null;
};

export default GoogleAnalytics;