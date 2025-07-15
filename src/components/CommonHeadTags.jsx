// src/components/CommonHeadTags.js
import React from 'react';
import { Helmet } from 'react-helmet'; // You might need to install react-helmet-async for React 18+ for proper SSR if needed

const CommonHeadTags = ({ title }) => {
  return (
    <Helmet>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densityDpi=device-dpi" />
      <title>{title || "FoodPark || Restaurant Template"}</title>
      <link rel="icon" type="image/png" href="/favicon.png" />
      {/* CSS imports are handled in index.js, so no need for <link> tags here unless they are specific to a page */}
    </Helmet>
  );
};

export default CommonHeadTags;