import React from 'react';

const Links = ({ coin }) => {
  const { links } = coin;
  return (
    <div>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl">Links</h1>
        <div>
          {links.map((item, ind) => {
            return (
              <div
                className="border-b border-brand/50 flex justify-between items-center py-3"
                key={ind}
              >
                <h2 className="text-lg font-semibold">{item.type}</h2>
                <a href={`${item.url}`} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Links;
