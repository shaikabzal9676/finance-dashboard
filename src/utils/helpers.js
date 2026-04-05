export const processTransactions = (transactions, search, filterType, sort) => {
  let data = [...transactions];

  if (search) {
    data = data.filter(t =>
      t.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filterType !== "all") {
    data = data.filter(t => t.type === filterType);
  }

  if (sort === "high") {
    data.sort((a, b) => b.amount - a.amount);
  } else {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return data;
};