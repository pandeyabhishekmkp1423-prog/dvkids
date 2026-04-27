const ageRanges = ['0-2', '3-5', '6-8', '9-12', '13+'];

const productNames = {
  Educational: [
    'Alphabet Adventure Blocks',
    'Counting Stars Learning Tray',
    'Mini Science Lab Set',
    'Storytime Explorer Bundle',
    'Junior Geography Globe',
    'Math Magic Puzzle Kit',
    'Reading Rocket Cards',
    'Language Builders Kit',
    'Creative Coding Starter Set',
    'Early Learning Busy Board'
  ],
  STEM: [
    'Solar Racer Kit',
    'Magnetic Engineering Set',
    'Robotics Discovery Cube',
    'Crystal Growing Science Lab',
    'Junior Circuit Builder',
    'Coding Caterpillar Bot',
    'Physics Launcher Pack',
    'Microscope Explorer Kit',
    'DIY Telescope Set',
    'Robot Rescue Mission'
  ],
  'Soft Toys': [
    'Huggable Cloud Bunny',
    'Dreamy Dino Plush',
    'Safari Friend Lion',
    'Polar Bear Cuddle Buddy',
    'Unicorn Sparkle Softie',
    'Ocean Pals Octopus',
    'Slumber Fox Plush',
    'Koala Cozy Companion',
    'Panda Playmate',
    'Royal Crown Teddy'
  ],
  Outdoor: [
    'Adventure Explorer Tent',
    'Bubble Blaster Launcher',
    'Balance Beam Trainer',
    'Garden Ranger Tool Set',
    'Kiddie Scooter Glide',
    'Catch & Toss Starter Kit',
    'Splash Water Play Mat',
    'Flyer Kite Adventure',
    'Backyard Bowling Set',
    'Trail Trek Binoculars'
  ],
  'Board Games': [
    'Treasure Quest Board',
    'Puzzle Planet Race',
    'Family Trivia Challenge',
    'Castle Builders Strategy',
    'Magic Maze Adventure',
    'Color Match Party',
    'Word Wizard Game',
    'Number Navigator',
    'Storyteller Card Game',
    'Memory Garden Challenge'
  ],
  'Role Play': [
    'Mini Chef Kitchen Set',
    'Doctor Healing Bag',
    'Construction Builder Vest',
    'Pirate Captain Kit',
    'Fashion Designer Studio',
    'Firefighter Rescue Set',
    'Princess Royal Costume',
    'Explorer Safari Pack',
    'Space Mission Suit',
    'Vet Clinic Playset'
  ],
  'Creative Kits': [
    'Rainbow Slime Studio',
    'Paint & Create Easel',
    'Bead Jewelry Maker',
    'Clay Modeling Workshop',
    'Sticker Storybook Kit',
    'Paper Craft Carousel',
    'Mosaic Magic Set',
    'Glitter Art Station',
    'Sketch & Shade Pad',
    'DIY Puppet Theater'
  ],
  'Baby Essentials': [
    'Soft Sensory Rattle',
    'Teething Joy Ring',
    'Musical Activity Gym',
    'Cuddly Cloud Blanket',
    'Peekaboo Plush Pals',
    'Safe Stacking Cups',
    'First Shapes Puzzle',
    'Baby Bath Safari',
    'Tiny Explorer Walker',
    'Soothing Sound Mobile'
  ],
  Sports: [
    'Mini Training Soccer Set',
    'Junior Basketball Hoop',
    'Yoga Stretch Mat',
    'Kids Tennis Rally Set',
    'Bat & Ball Play Set',
    'Golf Swing Starter',
    'Archery Practice Kit',
    'Obstacle Course Pack',
    'Skateboard Cruiser',
    'Fitness Fun Jumprope'
  ],
  Electronics: [
    'Learning Tablet Pad',
    'Smart Coding Robot',
    'Glow Keyboard Trainer',
    'Photo Story Camera',
    'Interactive Music Pad',
    'Night-Light Projector',
    'Voice Command Bus',
    'Light-Up Science Board',
    'Digital Learning Watch',
    'AR Explorer Glasses'
  ]
};

const imageMap = {
  Educational: [
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1584697964160-f70b80552c23?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1498079022511-d15614cb1c02?auto=format&fit=crop&w=900&q=80'
  ],
  STEM: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1581093588401-3d0a8d2df8b8?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1584655991238-31e1fecd8df4?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1590608897129-79bc3dc515a0?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1560932685-f17ba03c4c53?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1555685812-4b74329e2b02?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80'
  ],
  'Soft Toys': [
    'https://images.unsplash.com/photo-1529665253569-6d01c0eaf2b6?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1526318472351-bc7c0c9b5f4d?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1523251289000-0e5e8bb30c3d?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1543269865-0cc7d9e5c669?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1504314550008-9ae0b2d5e1fb?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1541845157-8a34edfa0f28?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1523473827532-3d2c184d8a6b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1500217818937-4f5f0ae2f17e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1516974409145-1fcced370d95?auto=format&fit=crop&w=900&q=80'
  ],
  Outdoor: [
    'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1526401485004-2d5e0ee46f64?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1514894787451-11a4f4b73f61?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1496384227827-3d21c4e29bf2?auto=format&fit=crop&w=900&q=80'
  ],
  'Board Games': [
    'https://images.unsplash.com/photo-1534422298391-e4f8c172b4d8?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1523540939390-2d5e62f5d1fa?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1508182316037-7b3c0fb9aed5?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1516893841298-5f4acdee68c8?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1523473827532-3d2c184d8a6b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1528150177505-76fce56e9bd8?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1520491259219-043eb7b01073?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=900&q=80'
  ],
  'Role Play': [
    'https://images.unsplash.com/photo-1520949307735-30ccaed9de7d?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1487837647815-bbc1f30cd0d2?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1543163521-1bf9f52bea6a?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1528800383759-d64bd2d4d84d?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1473187983305-f615310e7daa?auto=format&fit=crop&w=900&q=80'
  ],
  'Creative Kits': [
    'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1520975915642-bb4204ea6f6e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1520697222862-18ef6eb39b5b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1464375117522-1311a64cb12d?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1516637090014-cb1ab78511f5?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80'
  ],
  'Baby Essentials': [
    'https://images.unsplash.com/photo-1529188081474-3a3b93b8b9a0?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1519364931187-d3fa65ab99e5?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1505170462723-284ee9fc32d6?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1503437313881-503a91226422?auto=format&fit=crop&w=900&q=80'
  ],
  Sports: [
    'https://images.unsplash.com/photo-1508779018996-1d4c2b1181c0?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1526401485004-2d5e0ee46f64?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1508182316037-7b3c0fb9aed5?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1470240741270-5d6af1b33f32?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?auto=format&fit=crop&w=900&q=80'
  ],
  Electronics: [
    'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517059224940-d4af9eec41e6?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80'
  ]
};

const defaultDescriptions = {
  Educational: 'Designed to introduce letters, numbers, and meaningful play for growing learners.',
  STEM: 'A compact kit that encourages experimentation, building, and logic-based discovery.',
  'Soft Toys': 'Plush, gentle, and machine-friendly for everyday cuddles and imaginative stories.',
  Outdoor: 'Built for outside play, from picnics to backyard adventure challenges.',
  'Board Games': 'Easy-to-learn rules and bright pieces for social play with family and friends.',
  'Role Play': 'Dress-up and pretend scenarios that help children build confidence and creativity.',
  'Creative Kits': 'Colorful tools and materials packaged for expressive arts and sensory play.',
  'Baby Essentials': 'Soft textures and safety-first design to support infants and toddlers.',
  Sports: 'Youth-sized equipment that keeps kids active while developing coordination and balance.',
  Electronics: 'Smart interaction, sound, and lights designed for little tech explorers.'
};

const products = [];
let idCounter = 1;

Object.entries(productNames).forEach(([category, names]) => {
  const images = imageMap[category] || [];

  names.forEach((name, index) => {
    const price = 799 + index * 180 + Math.floor(category.length * 4);
    const originalPrice = Math.round(price / 0.9);
    const discount = 10;
    const rating = Number((4 + (index % 5) * 0.15).toFixed(1));
    const reviews = 16 + index * 12;
    const ageRange = ageRanges[index % ageRanges.length];
    const bestSeller = index % 3 === 0 ? 1 : 0;
    const newArrival = index % 4 === 0 ? 1 : 0;

    products.push({
      id: idCounter,
      name,
      price,
      original_price: originalPrice,
      discount,
      description: `${name} — ${defaultDescriptions[category]}`,
      image: images[index] || images[0],
      category,
      rating,
      reviews,
      age_range: ageRange,
      best_seller: bestSeller,
      new_arrival: newArrival
    });

    idCounter += 1;
  });
});

export default products;
