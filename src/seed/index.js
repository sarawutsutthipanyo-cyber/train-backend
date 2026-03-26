require('dotenv').config();
const sequelize = require('../config/database');
require('../models'); // Register all associations
const { Exercise, FoodItem } = require('../models');

const exercises = [
  // Chest
  { name: 'Bench Press', muscleGroup: 'chest', category: 'compound', description: 'Barbell flat bench press', instructions: 'Lie on bench, grip bar slightly wider than shoulder-width, lower to chest, press up.' },
  { name: 'Incline Bench Press', muscleGroup: 'chest', category: 'compound', description: 'Barbell incline bench press targeting upper chest', instructions: 'Set bench to 30-45 degrees, press bar from upper chest upward.' },
  { name: 'Push Up', muscleGroup: 'chest', category: 'bodyweight', description: 'Classic bodyweight chest exercise', instructions: 'Place hands shoulder-width apart, lower chest to ground, push back up.' },
  { name: 'Dumbbell Fly', muscleGroup: 'chest', category: 'isolation', description: 'Dumbbell chest fly on flat bench', instructions: 'Lie flat, hold dumbbells above chest, lower arms out in arc, return to start.' },
  { name: 'Cable Fly', muscleGroup: 'chest', category: 'isolation', description: 'Cable crossover fly for chest', instructions: 'Stand between cables, pull handles together in a hugging motion.' },
  { name: 'Dips', muscleGroup: 'chest', category: 'bodyweight', description: 'Chest-focused parallel bar dips', instructions: 'Lean forward slightly, lower body between bars, push back up.' },

  // Back
  { name: 'Deadlift', muscleGroup: 'back', category: 'compound', description: 'Conventional barbell deadlift', instructions: 'Hinge at hips, grip bar outside legs, drive through heels to stand.' },
  { name: 'Pull Up', muscleGroup: 'back', category: 'bodyweight', description: 'Overhand grip pull-up', instructions: 'Hang from bar with overhand grip, pull chest to bar, lower slowly.' },
  { name: 'Barbell Row', muscleGroup: 'back', category: 'compound', description: 'Bent-over barbell row', instructions: 'Hinge forward, pull bar to lower chest, squeeze shoulder blades.' },
  { name: 'Lat Pulldown', muscleGroup: 'back', category: 'compound', description: 'Wide-grip lat pulldown machine', instructions: 'Grip bar wide, pull down to upper chest, control on the way up.' },
  { name: 'Seated Cable Row', muscleGroup: 'back', category: 'compound', description: 'Seated cable row for mid-back', instructions: 'Sit with feet on platform, pull handle to stomach, squeeze back.' },
  { name: 'Face Pull', muscleGroup: 'back', category: 'isolation', description: 'Cable face pull for rear delts and upper back', instructions: 'Pull rope to face level with elbows high, external rotate at end.' },

  // Legs
  { name: 'Squat', muscleGroup: 'legs', category: 'compound', description: 'Barbell back squat', instructions: 'Bar on upper back, squat to parallel, drive through heels to stand.' },
  { name: 'Romanian Deadlift', muscleGroup: 'legs', category: 'compound', description: 'Romanian deadlift targeting hamstrings and glutes', instructions: 'Hinge at hips with soft knees, lower bar along legs, feel hamstring stretch.' },
  { name: 'Leg Press', muscleGroup: 'legs', category: 'compound', description: '45-degree leg press machine', instructions: 'Place feet shoulder-width on platform, press until legs nearly straight, lower controlled.' },
  { name: 'Leg Curl', muscleGroup: 'legs', category: 'isolation', description: 'Lying hamstring curl machine', instructions: 'Lie face down, curl weight toward glutes, lower slowly.' },
  { name: 'Leg Extension', muscleGroup: 'legs', category: 'isolation', description: 'Seated quad extension machine', instructions: 'Sit in machine, extend legs fully, lower slowly.' },
  { name: 'Calf Raise', muscleGroup: 'legs', category: 'isolation', description: 'Standing calf raise', instructions: 'Stand with balls of feet on edge, raise heels as high as possible, lower slowly.' },
  { name: 'Lunges', muscleGroup: 'legs', category: 'compound', description: 'Walking dumbbell lunges', instructions: 'Step forward into lunge, lower back knee toward floor, alternate legs.' },
  { name: 'Hip Thrust', muscleGroup: 'legs', category: 'compound', description: 'Barbell hip thrust for glutes', instructions: 'Shoulders on bench, barbell on hips, drive hips to ceiling, squeeze glutes at top.' },

  // Shoulders
  { name: 'Overhead Press', muscleGroup: 'shoulders', category: 'compound', description: 'Standing barbell overhead press', instructions: 'Press bar from shoulders to overhead, lock out arms at top.' },
  { name: 'Lateral Raise', muscleGroup: 'shoulders', category: 'isolation', description: 'Dumbbell lateral raise for side delts', instructions: 'Raise dumbbells out to sides to shoulder height, lower slowly.' },
  { name: 'Front Raise', muscleGroup: 'shoulders', category: 'isolation', description: 'Dumbbell front raise for anterior deltoid', instructions: 'Raise dumbbells in front to shoulder height, lower slowly.' },
  { name: 'Arnold Press', muscleGroup: 'shoulders', category: 'compound', description: 'Arnold dumbbell press with rotation', instructions: 'Start with palms facing you, rotate outward as you press overhead.' },
  { name: 'Shrug', muscleGroup: 'shoulders', category: 'isolation', description: 'Barbell or dumbbell shrug for traps', instructions: 'Hold weight, shrug shoulders up to ears, hold briefly, lower.' },

  // Arms
  { name: 'Bicep Curl', muscleGroup: 'arms', category: 'isolation', description: 'Standing dumbbell bicep curl', instructions: 'Curl weights up keeping elbows fixed, squeeze at top, lower slowly.' },
  { name: 'Hammer Curl', muscleGroup: 'arms', category: 'isolation', description: 'Neutral-grip dumbbell hammer curl', instructions: 'Curl with palms facing each other, targets brachialis and brachioradialis.' },
  { name: 'Preacher Curl', muscleGroup: 'arms', category: 'isolation', description: 'EZ-bar preacher curl on preacher bench', instructions: 'Rest arms on pad, curl bar up, fully extend at bottom.' },
  { name: 'Tricep Pushdown', muscleGroup: 'arms', category: 'isolation', description: 'Cable tricep pushdown with rope or bar', instructions: 'Keep elbows fixed at sides, push attachment down to full extension.' },
  { name: 'Skull Crusher', muscleGroup: 'arms', category: 'isolation', description: 'Lying EZ-bar tricep extension', instructions: 'Lie on bench, lower bar to forehead, extend arms to press up.' },
  { name: 'Close Grip Bench Press', muscleGroup: 'arms', category: 'compound', description: 'Close-grip barbell bench press for triceps', instructions: 'Grip bar shoulder-width, lower to chest, press up keeping elbows close.' },

  // Core
  { name: 'Plank', muscleGroup: 'core', category: 'bodyweight', description: 'Standard forearm plank', instructions: 'Hold body in straight line from head to heels on forearms and toes.' },
  { name: 'Crunch', muscleGroup: 'core', category: 'bodyweight', description: 'Basic abdominal crunch', instructions: 'Lie on back, curl shoulders off floor contracting abs, lower slowly.' },
  { name: 'Russian Twist', muscleGroup: 'core', category: 'bodyweight', description: 'Seated oblique Russian twist', instructions: 'Sit with feet off floor, twist torso side to side with or without weight.' },
  { name: 'Leg Raise', muscleGroup: 'core', category: 'bodyweight', description: 'Lying leg raise for lower abs', instructions: 'Lie flat, raise legs to 90 degrees, lower slowly without touching floor.' },
  { name: 'Dead Bug', muscleGroup: 'core', category: 'bodyweight', description: 'Dead bug anti-rotation core exercise', instructions: 'Lie on back, extend opposite arm and leg while keeping lower back pressed to floor.' },
  { name: 'Ab Wheel Rollout', muscleGroup: 'core', category: 'bodyweight', description: 'Ab wheel rollout for entire core', instructions: 'Kneel, roll wheel out until body is extended, pull back in using abs.' },

  // Cardio
  { name: 'Running', muscleGroup: 'cardio', category: 'cardio', description: 'Outdoor or treadmill running', instructions: 'Maintain steady pace, land midfoot, keep upright posture.' },
  { name: 'Cycling', muscleGroup: 'cardio', category: 'cardio', description: 'Stationary or outdoor cycling', instructions: 'Adjust seat height so leg is nearly extended at bottom of pedal stroke.' },
  { name: 'Jump Rope', muscleGroup: 'cardio', category: 'cardio', description: 'Jump rope cardio', instructions: 'Jump with both feet, keep jumps low, maintain a steady rhythm.' },
  { name: 'HIIT', muscleGroup: 'cardio', category: 'cardio', description: 'High-intensity interval training', instructions: 'Alternate between max effort intervals and active recovery periods.' },
  { name: 'Swimming', muscleGroup: 'cardio', category: 'cardio', description: 'Freestyle or mixed stroke swimming', instructions: 'Rotate strokes, maintain breathing rhythm, focus on form.' },
];

const foodItems = [
  // Thai foods
  { name: 'Jasmine Rice (Cooked)', nameTh: 'ข้าวสวย', category: 'grains', caloriesPer100g: 130, proteinPer100g: 2.7, carbsPer100g: 28.2, fatPer100g: 0.3, defaultServingSize: 150, defaultServingUnit: 'g' },
  { name: 'Brown Rice (Cooked)', nameTh: 'ข้าวกล้อง', category: 'grains', caloriesPer100g: 123, proteinPer100g: 2.6, carbsPer100g: 25.6, fatPer100g: 0.9, defaultServingSize: 150, defaultServingUnit: 'g' },
  { name: 'Boiled Egg', nameTh: 'ไข่ต้ม', category: 'protein', caloriesPer100g: 155, proteinPer100g: 13.0, carbsPer100g: 1.1, fatPer100g: 10.6, defaultServingSize: 55, defaultServingUnit: 'g' },
  { name: 'Steamed Chicken Breast', nameTh: 'ไก่ต้ม (อก)', category: 'protein', caloriesPer100g: 165, proteinPer100g: 31.0, carbsPer100g: 0.0, fatPer100g: 3.6, defaultServingSize: 150, defaultServingUnit: 'g' },
  { name: 'Pork Tenderloin', nameTh: 'หมูสันใน', category: 'protein', caloriesPer100g: 143, proteinPer100g: 26.0, carbsPer100g: 0.0, fatPer100g: 3.5, defaultServingSize: 150, defaultServingUnit: 'g' },
  { name: 'Steamed Mackerel', nameTh: 'ปลาทูนึ่ง', category: 'protein', caloriesPer100g: 158, proteinPer100g: 22.0, carbsPer100g: 0.0, fatPer100g: 7.5, defaultServingSize: 100, defaultServingUnit: 'g' },
  { name: 'White Tofu', nameTh: 'เต้าหู้ขาว', category: 'protein', caloriesPer100g: 76, proteinPer100g: 8.0, carbsPer100g: 1.9, fatPer100g: 4.2, defaultServingSize: 100, defaultServingUnit: 'g' },
  { name: 'Snow Peas', nameTh: 'ถั่วลันเตา', category: 'vegetables', caloriesPer100g: 42, proteinPer100g: 2.8, carbsPer100g: 7.5, fatPer100g: 0.2, defaultServingSize: 100, defaultServingUnit: 'g' },
  { name: 'Broccoli', nameTh: 'บรอกโคลี', category: 'vegetables', caloriesPer100g: 34, proteinPer100g: 2.8, carbsPer100g: 6.6, fatPer100g: 0.4, defaultServingSize: 100, defaultServingUnit: 'g' },
  { name: 'Banana', nameTh: 'กล้วยหอม', category: 'fruits', caloriesPer100g: 89, proteinPer100g: 1.1, carbsPer100g: 22.8, fatPer100g: 0.3, defaultServingSize: 120, defaultServingUnit: 'g' },
  { name: 'Mango', nameTh: 'มะม่วง', category: 'fruits', caloriesPer100g: 60, proteinPer100g: 0.8, carbsPer100g: 15.0, fatPer100g: 0.4, defaultServingSize: 150, defaultServingUnit: 'g' },
  { name: 'Kluay Nam Wa Banana', nameTh: 'กล้วยน้ำว้า', category: 'fruits', caloriesPer100g: 99, proteinPer100g: 1.3, carbsPer100g: 26.0, fatPer100g: 0.3, defaultServingSize: 80, defaultServingUnit: 'g' },
  { name: 'Krapao Chicken with Fried Egg', nameTh: 'กะเพราไก่ไข่ดาว', category: 'thai_dish', caloriesPer100g: 185, proteinPer100g: 14.0, carbsPer100g: 8.0, fatPer100g: 11.0, defaultServingSize: 300, defaultServingUnit: 'g' },
  { name: 'Khao Man Gai', nameTh: 'ข้าวมันไก่', category: 'thai_dish', caloriesPer100g: 155, proteinPer100g: 10.0, carbsPer100g: 22.0, fatPer100g: 3.5, defaultServingSize: 350, defaultServingUnit: 'g' },
  { name: 'Som Tam', nameTh: 'ส้มตำ', category: 'thai_dish', caloriesPer100g: 58, proteinPer100g: 2.5, carbsPer100g: 10.0, fatPer100g: 1.5, defaultServingSize: 200, defaultServingUnit: 'g' },
  { name: 'Stir-Fried Mixed Vegetables', nameTh: 'ผัดผักรวม', category: 'thai_dish', caloriesPer100g: 65, proteinPer100g: 3.0, carbsPer100g: 7.0, fatPer100g: 3.0, defaultServingSize: 200, defaultServingUnit: 'g' },

  // International foods
  { name: 'Chicken Breast (Raw)', nameTh: 'อกไก่', category: 'protein', caloriesPer100g: 120, proteinPer100g: 22.5, carbsPer100g: 0.0, fatPer100g: 2.6, defaultServingSize: 150, defaultServingUnit: 'g' },
  { name: 'Salmon (Raw)', nameTh: 'ปลาแซลมอน', category: 'protein', caloriesPer100g: 208, proteinPer100g: 20.0, carbsPer100g: 0.0, fatPer100g: 13.4, defaultServingSize: 150, defaultServingUnit: 'g' },
  { name: 'Tuna (Canned in Water)', nameTh: 'ทูน่ากระป๋อง', category: 'protein', caloriesPer100g: 116, proteinPer100g: 25.5, carbsPer100g: 0.0, fatPer100g: 0.9, defaultServingSize: 85, defaultServingUnit: 'g' },
  { name: 'Whole Egg', nameTh: 'ไข่ไก่', category: 'protein', caloriesPer100g: 155, proteinPer100g: 13.0, carbsPer100g: 1.1, fatPer100g: 10.6, defaultServingSize: 55, defaultServingUnit: 'g' },
  { name: 'Greek Yogurt (Plain)', nameTh: 'กรีกโยเกิร์ต', category: 'dairy', caloriesPer100g: 59, proteinPer100g: 10.0, carbsPer100g: 3.6, fatPer100g: 0.4, defaultServingSize: 200, defaultServingUnit: 'g' },
  { name: 'Oatmeal (Dry)', nameTh: 'โอ๊ตมีล', category: 'grains', caloriesPer100g: 389, proteinPer100g: 16.9, carbsPer100g: 66.3, fatPer100g: 6.9, defaultServingSize: 80, defaultServingUnit: 'g' },
  { name: 'Sweet Potato (Cooked)', nameTh: 'มันเทศต้ม', category: 'vegetables', caloriesPer100g: 86, proteinPer100g: 1.6, carbsPer100g: 20.1, fatPer100g: 0.1, defaultServingSize: 150, defaultServingUnit: 'g' },
  { name: 'Brown Rice (Dry)', nameTh: 'ข้าวกล้องดิบ', category: 'grains', caloriesPer100g: 370, proteinPer100g: 7.9, carbsPer100g: 77.2, fatPer100g: 2.9, defaultServingSize: 60, defaultServingUnit: 'g' },
  { name: 'Spinach', nameTh: 'ผักโขม', category: 'vegetables', caloriesPer100g: 23, proteinPer100g: 2.9, carbsPer100g: 3.6, fatPer100g: 0.4, defaultServingSize: 100, defaultServingUnit: 'g' },
  { name: 'Almonds', nameTh: 'อัลมอนด์', category: 'nuts', caloriesPer100g: 579, proteinPer100g: 21.2, carbsPer100g: 21.6, fatPer100g: 49.9, defaultServingSize: 30, defaultServingUnit: 'g' },
  { name: 'Peanut Butter', nameTh: 'เนยถั่ว', category: 'nuts', caloriesPer100g: 588, proteinPer100g: 25.1, carbsPer100g: 20.1, fatPer100g: 50.4, defaultServingSize: 32, defaultServingUnit: 'g' },
  { name: 'Whey Protein Powder', nameTh: 'เวย์โปรตีน', category: 'supplements', caloriesPer100g: 370, proteinPer100g: 75.0, carbsPer100g: 10.0, fatPer100g: 5.0, defaultServingSize: 30, defaultServingUnit: 'g' },
  { name: 'Apple', nameTh: 'แอปเปิล', category: 'fruits', caloriesPer100g: 52, proteinPer100g: 0.3, carbsPer100g: 13.8, fatPer100g: 0.2, defaultServingSize: 180, defaultServingUnit: 'g' },
  { name: 'Orange', nameTh: 'ส้ม', category: 'fruits', caloriesPer100g: 47, proteinPer100g: 0.9, carbsPer100g: 11.8, fatPer100g: 0.1, defaultServingSize: 130, defaultServingUnit: 'g' },
  { name: 'Avocado', nameTh: 'อาโวคาโด', category: 'fruits', caloriesPer100g: 160, proteinPer100g: 2.0, carbsPer100g: 8.5, fatPer100g: 14.7, defaultServingSize: 150, defaultServingUnit: 'g' },
  { name: 'Quinoa (Cooked)', nameTh: 'ควินัว', category: 'grains', caloriesPer100g: 120, proteinPer100g: 4.4, carbsPer100g: 21.3, fatPer100g: 1.9, defaultServingSize: 150, defaultServingUnit: 'g' },
  { name: 'Whole Milk', nameTh: 'นมสด', category: 'dairy', caloriesPer100g: 61, proteinPer100g: 3.2, carbsPer100g: 4.8, fatPer100g: 3.3, defaultServingSize: 240, defaultServingUnit: 'ml' },
  { name: 'Cottage Cheese', nameTh: 'คอทเทจชีส', category: 'dairy', caloriesPer100g: 98, proteinPer100g: 11.1, carbsPer100g: 3.4, fatPer100g: 4.3, defaultServingSize: 100, defaultServingUnit: 'g' },
];

const seed = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    await sequelize.sync({ alter: true });
    console.log('Tables synced.');

    // Check if already seeded
    const existingExercises = await Exercise.count();
    if (existingExercises > 0) {
      console.log(`Seed already done. Found ${existingExercises} exercises. Skipping.`);
      process.exit(0);
    }

    // Seed exercises
    await Exercise.bulkCreate(exercises);
    console.log(`Seeded ${exercises.length} exercises.`);

    // Seed food items
    await FoodItem.bulkCreate(foodItems);
    console.log(`Seeded ${foodItems.length} food items.`);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
};

seed();
