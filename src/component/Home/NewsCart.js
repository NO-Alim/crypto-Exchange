import React from 'react';

const NewsCart = ({ item }) => {
  const { name, description, ampUrl } = item;
  const provider = item.provider[0];
  const providerName = provider.name;
  return (
    <a
      href={
        ampUrl
          ? ampUrl
          : 'https://www.ibtimes.com/why-law-enforcement-struggles-throttle-crypto-scams-3625987?amp=1'
      }
      target="_blank"
      rel="noreferrer"
      className="h-full"
    >
      <div className="bg-textPrimary/90 all hover:bg-brand/90 rounded-md cursor-pointer overflow-hidden">
        <div className="p-2 flex flex-col gap-2">
          <h3 className="font-semibold text-background text-sm">
            Author : <span className="text-background/60">{providerName}</span>
          </h3>
          <h1 className="text-lg">
            {name?.length < 56 ? `${name}` : `${name.substring(0, 55)}...`}
          </h1>
          <h2 className="text-background/60">
            {description?.length < 90
              ? `${description}`
              : `${description.substring(0, 89)}...`}
          </h2>
        </div>
      </div>
    </a>
  );
};

export default NewsCart;
