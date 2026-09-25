export const slug = text => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const column = (title, links) => ({ title, links });
const sizes = ['5X - 7X', '3X - 4X', '1X - 2X', 'L - XL', 'XXS - M', 'One Size'];
export const menus = {
  "What's New": {
    columns: [column("What's New", ['All New Arrivals'])],
    cards: [{ image: 'card-new1.png', title: 'Black & White' }, { image: 'card-new2.png', title: 'cantiqlA' }],
  },
  Brands: {
    columns: [
      column('Brands', ['All brands', 'Baacal', 'Be Idle', 'Besida', 'cantiqlA', 'Chouette Designs', 'Conscious Clothing', 'Conscious Step', 'Crazy Compression', 'Expansse Active']),
      column('F - O', ['Feelhandmade', 'FITSO', 'Fyoli Fyoli', 'GIA/irl', 'Hilary MacMillan', 'Nettle Studios', 'Noble', 'Nomads Swimwear', 'NOOWORKS', 'Out of the Woods']),
      column('P - S', ['Pamut Apparel', 'Poplinen', 'Proclaim', 'RCA Public Label', 'Reistor', 'Reprise Activewear', 'Retrollicious', 'Sante Grace', 'See ROSE Go', 'Sela Designs']),
      column('S - V', ['State Bags', 'Superfit Hero', "Sweet Baby Ray's", 'Symbology', 'Tamara Malas', 'Thunderpants US', 'TomboyX', 'Tribe + Temple', 'Village Thrive']),
    ],
    cards: [{ image: 'card-brands.png', title: 'Hilary MacMillan', badge: 'Higher Social Purpose' }],
  },
  Clothing: {
    columns: [column('Clothing', ['Best Sellers', 'Dresses & Jumpsuits', 'Tops', 'Pants', 'Bottoms', 'Innerwear', 'Outerwear', 'Activewear', 'Swimwear', 'All Clothing']), column('Shop by Size', sizes)],
    cards: [{ image: 'card-clothing1.png', title: 'Linen Looks' }, { image: 'card-clothing2.png', title: 'Made to Order' }],
  },
  Dresses: {
    columns: [column('Dresses', ['Jumpsuits', 'Maxi', 'Midi', 'Shop All Dresses', 'Best Sellers', 'New In', 'Popular']), column('Shop by Size', ['6X - 6X', '3X - 4X', '1X - 2X', 'L - XL', 'XS - M', 'One Size'])],
    cards: [{ image: 'card-dresses.png', title: 'Little Black Dress' }],
  },
  Accessories: {
    columns: [column('Accessories', ['Scarves', 'Jewelry', 'Belts', 'Bags', 'Legwear', 'Shop All Accessories'])],
    cards: [{ image: 'card-accessories.png', title: 'Linen Looks' }],
  },
  Editorial: {
    columns: [column('Community', ['Brand Spotlight', 'Community Spotlight', 'Viva Voce Dressing Room']), column('Our Voices', [{ label: 'About Us', avatar: 'about-us.png' }, { label: "Founder's Notes", avatar: 'founders-note.png' }])],
    stories: [
      { image: 'story-thumbnail1.png', category: 'Ethical Fashion', title: 'Aja Barber: "We Have to Stop Turning a Blind Eye" to Fast Fashion', date: '3 days ago' },
      { image: 'story-thumbnail2.png', category: 'Founder', title: 'Fat Founder Thoughts: On showing up fat as a founder, entrepreneur, and leader', date: '6 days ago' },
      { image: 'story-thumbnail3.png', category: 'Interview', title: 'Why Emma Copley Eisenberg Refuses to Make Fatness the Pivot in Her Narrative', date: '07/08/2026' },
    ],
  },
};
export const navItems = Object.keys(menus);
