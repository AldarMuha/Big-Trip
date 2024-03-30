const generateOffer = () => ({
  title: 'Upgrade to a business class',
  price: 120
});

export const generateOffers = () =>
  Array.from({ length: 10 }, (_, index) => {
    const offerItem = generateOffer();

    return {
      id: String(index + 1),
      ...offerItem,
    };
  });
