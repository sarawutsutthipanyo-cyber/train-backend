require('dotenv').config();
const sequelize = require('../config/database');
require('../models');
const { FoodItem } = require('../models');

// Unsplash source URLs — reliable food photos by keyword
const imageMap = {
  'Jasmine Rice (Cooked)':        'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=200&h=200&fit=crop',
  'Brown Rice (Cooked)':          'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=200&h=200&fit=crop',
  'Brown Rice (Dry)':             'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=200&h=200&fit=crop',
  'Boiled Egg':                   'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&h=200&fit=crop',
  'Whole Egg':                    'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&h=200&fit=crop',
  'Steamed Chicken Breast':       'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&h=200&fit=crop',
  'Chicken Breast (Raw)':         'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&h=200&fit=crop',
  'Pork Tenderloin':              'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=200&h=200&fit=crop',
  'Steamed Mackerel':             'https://images.unsplash.com/photo-1565280654386-36c3ea911eff?w=200&h=200&fit=crop',
  'Salmon (Raw)':                 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200&h=200&fit=crop',
  'Tuna (Canned in Water)':       'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=200&h=200&fit=crop',
  'White Tofu':                   'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop',
  'Snow Peas':                    'https://images.unsplash.com/photo-1516382799247-87df95d790b7?w=200&h=200&fit=crop',
  'Broccoli':                     'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=200&h=200&fit=crop',
  'Spinach':                      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&h=200&fit=crop',
  'Sweet Potato (Cooked)':        'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=200&h=200&fit=crop',
  'Banana':                       'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=200&h=200&fit=crop',
  'Kluay Nam Wa Banana':          'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=200&h=200&fit=crop',
  'Mango':                        'https://images.unsplash.com/photo-1553279768-865429fa0078?w=200&h=200&fit=crop',
  'Apple':                        'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=200&fit=crop',
  'Orange':                       'https://images.unsplash.com/photo-1547514701-42782101795e?w=200&h=200&fit=crop',
  'Avocado':                      'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&h=200&fit=crop',
  'Greek Yogurt (Plain)':         'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop',
  'Whole Milk':                   'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop',
  'Cottage Cheese':               'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200&h=200&fit=crop',
  'Oatmeal (Dry)':                'https://images.unsplash.com/photo-1571748982800-fa51082c2224?w=200&h=200&fit=crop',
  'Quinoa (Cooked)':              'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop',
  'Almonds':                      'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=200&h=200&fit=crop',
  'Peanut Butter':                'https://images.unsplash.com/photo-1501200291289-c5a76c232e5f?w=200&h=200&fit=crop',
  'Whey Protein Powder':          'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=200&h=200&fit=crop',
  'Krapao Chicken with Fried Egg':'https://images.unsplash.com/photo-1562802378-063ec186a863?w=200&h=200&fit=crop',
  'Khao Man Gai':                 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=200&h=200&fit=crop',
  'Som Tam':                      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=200&h=200&fit=crop',
  'Stir-Fried Mixed Vegetables':  'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop',
};

// Category fallbacks for any item not in the map
const categoryFallback = {
  grains:       'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop',
  protein:      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&h=200&fit=crop',
  vegetables:   'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop',
  fruits:       'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=200&h=200&fit=crop',
  dairy:        'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop',
  nuts:         'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=200&h=200&fit=crop',
  thai_dish:    'https://images.unsplash.com/photo-1562802378-063ec186a863?w=200&h=200&fit=crop',
  supplements:  'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=200&h=200&fit=crop',
  other:        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop',
};

const run = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log('Connected. Updating food images...');

  const items = await FoodItem.findAll();
  let updated = 0;

  for (const item of items) {
    const url = imageMap[item.name] || categoryFallback[item.category] || categoryFallback.other;
    await item.update({ imageUrl: url });
    updated++;
    console.log(`  ✓ ${item.name}`);
  }

  console.log(`\nDone! Updated ${updated} food items with images.`);
  process.exit(0);
};

run().catch((err) => { console.error(err.message); process.exit(1); });
