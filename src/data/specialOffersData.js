const specialOffersData = [
  {
    id: 1,
    captionText: 'Espresso',
    caption: (
      <>
        Espresso <span className="special-offer-caption">from Special Offers</span>
      </>
    ),
    beforePrice: '$5.00',
    currentPrice: '$3.00',
    description: 'Strong, rich coffee brewed by forcing hot water through finely-ground beans.',
    image: `${process.env.PUBLIC_URL}/images/espresso.jpeg`,
  },
  {
    id: 2,
    captionText: 'Latte',
    caption: (
      <>
        Latte <span className="special-offer-caption">from Special Offers</span>
      </>
    ),
    beforePrice: '$6.00',
    currentPrice: '$4.50',
    description: 'Smooth espresso with steamed milk, topped with a light foam.',
    image: `${process.env.PUBLIC_URL}/images/latte.jpeg`,
  },
  {
    id: 3,
    captionText: 'Cappuccino',
    caption: (
      <>
        Cappuccino <span className="special-offer-caption">from Special Offers</span>
      </>
    ),
    beforePrice: '$5.50',
    currentPrice: '$3.50',
    description: 'Equal parts espresso, steamed milk, and foam.',
    image: `${process.env.PUBLIC_URL}/images/cappuccino.jpeg`,
  },
  {
    id: 4,
    captionText: 'Americano',
    caption: (
      <>
        Americano <span className="special-offer-caption">from Special Offers</span>
      </>
    ),
    beforePrice: '$4.50',
    currentPrice: '$3.00',
    description: 'Espresso diluted with hot water, giving a milder flavor.',
    image: `${process.env.PUBLIC_URL}/images/americano.jpeg`,
  },
  {
    id: 5,
    captionText: 'Mocha',
    caption: (
      <>
        Mocha <span className="special-offer-caption">from Special Offers</span>
      </>
    ),
    beforePrice: '$6.50',
    currentPrice: '$5.00',
    description: 'Espresso, steamed milk, and chocolate syrup, topped with whipped cream.',
    image: `${process.env.PUBLIC_URL}/images/mocha.jpeg`,
  },
  {
    id: 6,
    captionText: 'Macchiato',
    caption: (
      <>
        Macchiato <span className="special-offer-caption">from Special Offers</span>
      </>
    ),
    beforePrice: '$5.75',
    currentPrice: '$4.25',
    description: 'A shot of espresso marked with a small amount of frothed milk.',
    image: `${process.env.PUBLIC_URL}/images/macchiato.jpeg`,
  },
  {
    id: 7,
    captionText: 'Flat White',
    caption: (
      <>
        Flat White <span className="special-offer-caption">from Special Offers</span>
      </>
    ),
    beforePrice: '$5.25',
    currentPrice: '$4.00',
    description: 'A double shot of espresso topped with a thin layer of microfoam.',
    image: `${process.env.PUBLIC_URL}/images/flatwhite.jpeg`,
  },
  {
    id: 8,
    captionText: 'Iced Coffee',
    caption: (
      <>
        Iced Coffee <span className="special-offer-caption">from Special Offers</span>
      </>
    ),
    beforePrice: '$4.75',
    currentPrice: '$3.50',
    description: 'Brewed coffee cooled and served over ice, customizable with sweeteners and flavors.',
    image: `${process.env.PUBLIC_URL}/images/icedcoffee.jpeg`,
  },
  {
    id: 9,
    captionText: 'Cold Brew',
    caption: (
      <>
        Cold Brew <span className="special-offer-caption">from Special Offers</span>
      </>
    ),
    beforePrice: '$5.00',
    currentPrice: '$3.75',
    description: 'Made by steeping coffee grounds in cold water for an extended period, resulting in a smooth, less acidic drink.',
    image: `${process.env.PUBLIC_URL}/images/cortado.jpeg`,
  },
];

export default specialOffersData;