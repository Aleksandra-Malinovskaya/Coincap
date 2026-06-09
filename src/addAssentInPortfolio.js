export const addAssetinPortfolio = (asset, count = 1) => {
  const savedData = localStorage.getItem("user_portfolio");
  const saved = savedData ? JSON.parse(savedData) : [];
  let newPortfolio;
  const numericCount = parseFloat(count);
  const currentPrice = parseFloat(asset.priceUsd);
  if (saved.find((item) => item.id === asset.id)) {
    newPortfolio = saved.map((item) => {
      if (item.id == asset.id) {
        const updatedCount = item.count + numericCount;
        return {
          ...item,
          count: updatedCount,
          result: updatedCount * item.cost,
        };
      }
      return item;
    });
  } else {
    const newAsset = {
      id: asset.id,
      name: asset.name,
      cost: currentPrice,
      count: numericCount,
      result: currentPrice * numericCount,
    };
    newPortfolio = [...saved, newAsset];
  }

  localStorage.setItem("user_portfolio", JSON.stringify(newPortfolio));
};
