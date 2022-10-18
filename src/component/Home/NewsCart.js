import React from 'react';

const NewsCart = ({ item }) => {
  console.log(item);
  const { name, datePublished, description, ampUrl, image } = item;
  const { contentUrl } = image.thumbnail;
  const provider = item.provider[0];
  const providerName = provider.name;
  return (
    <a href={ampUrl} target="_blank" rel="noreferrer" className="h-full">
      <div className="bg-textPrimary/90 all hover:bg-brand/90 rounded-md cursor-pointer overflow-hidden">
        <img className="w-full" src={contentUrl} alt="" />
        <div className="p-2 flex flex-col gap-2">
          <h3 className="font-semibold text-background text-sm">
            Author : <span className="text-background/60">{providerName}</span>
          </h3>
          <h1 className="text-lg">
            {name?.length < 40 ? `${name}` : `${name.substring(0, 38)}...`}
          </h1>
          <h2 className="text-background/60">
            {description?.length < 60
              ? `${description}`
              : `${description.substring(0, 59)}...`}
          </h2>
        </div>
      </div>
    </a>
  );
};

export default NewsCart;
