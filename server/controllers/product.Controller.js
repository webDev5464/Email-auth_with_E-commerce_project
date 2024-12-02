import products from "../Product.json" assert { type: "json" };

export const Product = async (req, res) => {
  try {
    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products available at the moment.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
