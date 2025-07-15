// controllers/featureController.js
export const getFeatures = (req, res) => {
  // In practice, you’d fetch this from MongoDB.
  res.json({
    heading: {
      small: "why choose us",
      title: "Why FoodPark is Special",
      subTitle: "Quality food with quick service and amazing offers."
    },
    features: [
      {
        icon: "fas fa-percent",
        title: "Discount Voucher",
        desc: "Get amazing discounts on your orders."
      },
      {
        icon: "fas fa-burger-soda",
        title: "Fresh Healthy Foods",
        desc: "Enjoy fresh and healthy meals every day."
      },
      {
        icon: "far fa-hat-chef",
        title: "Fast Serve On Table",
        desc: "Quick service to satisfy your cravings."
      }
    ]
  });
};
