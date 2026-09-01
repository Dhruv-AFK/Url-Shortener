import React from "react";
import ShortenItem from "./ShortenItem";

const ShortenUrlList = ({ data = [] }) => {
  return (
    <div className="w-full my-6 space-y-4">
      {data.map((item) => (
        <ShortenItem
          key={item.id}
          originalUrl={item.originalUrl}
          shortUrl={item.shortUrl}
          clickCount={item.clickCount}
          createdDate={item.createdDate}
        />
      ))}
    </div>
  );
};

export default ShortenUrlList;