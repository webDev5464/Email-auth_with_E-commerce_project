// Utility Function: PriceFormatter.js

const PriceFormatter = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price * 12);
};

export default PriceFormatter;
