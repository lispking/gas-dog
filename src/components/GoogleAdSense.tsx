import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface GoogleAdSenseProps {
  client?: string;
  slot?: string;
  format?: 'auto' | 'fluid';
  responsive?: boolean;
  className?: string;
}

const GoogleAdSense: React.FC<GoogleAdSenseProps> = ({
  client = 'ca-pub-6255376809208012', // Replace with your AdSense client ID
  slot = '',
  format = 'auto',
  responsive = true,
  className = ''
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    try {
      // Load AdSense script if not already loaded
      if (!(window as any).adsbygoogle) {
        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.setAttribute('data-ad-client', client);
        document.head.appendChild(script);
      }

      // Push the ad
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [client]);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className={`adsbygoogle ${responsive ? 'adsbygoogle-responsive' : ''}`}
        style={{
          display: 'block',
          textAlign: 'center',
          minHeight: '50px',
        }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

export default GoogleAdSense;