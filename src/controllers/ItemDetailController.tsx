export const getItemCost = (itemName: string): number => {
    const itemCosts: { [key: string]: number } = {
      Apple: 1.5,
      Orange: 2.0,
      Shampoo: 5.0,
      Toothpaste: 2.5,
      Detergent: 3.0,
      Chocolates: 1.0,
    };
  
    return itemCosts[itemName] || 0;
  };
  