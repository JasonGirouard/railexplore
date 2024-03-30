import React, { useEffect } from 'react';
import TagManager from 'react-gtm-module';

const GoogleTagManager = () => {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-NFZXLHSR' });
  }, []);

  return null;
};

export default GoogleTagManager;