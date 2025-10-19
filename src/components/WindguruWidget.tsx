import React, { useEffect } from 'react';

const WindguruWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    const arg = ["s=46797" ,"m=100","uid=wg_fwdg_46797_100_1760905541833" ,"wj=knots" ,"tj=c" ,"waj=m" ,"tij=cm" ,"odh=0" ,"doh=24" ,"fhours=240" ,"hrsm=2" ,"vt=forecasts" ,"lng=cz" ,"idbs=1" ,"p=WINDSPD,GUST,SMER,TMP,TMPE,FLHGT,CDC,APCP1s,RATING"];
    script.id = 'wg_fwdg_46797_100_1760905541833';
    script.src = `https://www.windguru.cz/js/widget.php?${arg.join('&')}`;
    script.async = true;

    const container = document.getElementById('windguru-widget-container');
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container && container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, []);

  return <div id="windguru-widget-container"></div>;
};

export default WindguruWidget;
