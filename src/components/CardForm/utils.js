export const reduceItem = price => {
        const priceNumber = price ? parseFloat(price.replace(',', '.')) : 0;
        return ([prevItems, prevPrice], cur) => (cur ? [prevItems + parseInt(cur), prevPrice + parseInt(cur) * priceNumber] : [prevItems, prevPrice]);
    },
    reduceTotal = (prices, products) => ([prevItems, prevPrice], cur) => {
        const { requestedQuantities } = products[cur];
        const price = prices[cur];
        if (!cur || !requestedQuantities || !price) return [prevItems, prevPrice];
        const [curItems, curPrice] = Object.values(requestedQuantities).reduce(reduceItem(price), [0, 0]);
        return [prevItems + curItems, prevPrice + curPrice];
    };
