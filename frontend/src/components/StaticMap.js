import React from "react";

const StaticMap = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.682739500953!2d-74.0589609!3d4.6505566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a414e892f5f%3A0xb073e71cf03eebd4!2sEdificio%20Plaza%2067!5e0!3m2!1ses!2sco!4v1758828078573!5m2!1ses!2sco"
        width="100%"
        height="100%"
        style={{ border: 0, flex: 1 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa Plaza 67"
      ></iframe>
    </div>
  );
};

export default StaticMap;
