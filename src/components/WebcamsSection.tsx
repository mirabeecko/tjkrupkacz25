
import React from "react";
import { Info } from "lucide-react";

interface WebcamProps {
  title: string;
  embedUrl: string;
}

const webcams: WebcamProps[] = [
  { title: "HORNÍ STANICE", embedUrl: "https://rtsp.me/embed/eyST2ZdA/" },
  { title: "SLOUP č. 22", embedUrl: "https://rtsp.me/embed/r32e6FtS/" },
  { title: "FOJTOVICE", embedUrl: "https://www.ipcamlive.com/592f3bce0107c" },
];

const WebcamsSection: React.FC = () => {
  return (
    <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-montserrat font-bold mb-6 text-tjk-blue flex items-center">
        <Info className="h-6 w-6 text-tjk-orange mr-3" />
        Webkamery v areálu
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {webcams.map((webcam, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg">
            <h3 className="bg-tjk-blue text-white p-3 font-medium">{webcam.title}</h3>
            <div className="aspect-video">
              <iframe 
                src={webcam.embedUrl} 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen 
                title={`Webkamera - ${webcam.title}`}
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WebcamsSection;
