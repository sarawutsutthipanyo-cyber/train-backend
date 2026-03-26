require('dotenv').config();
const { Sequelize, DataTypes, Op } = require('sequelize');

// Connect to production DB with SSL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  }
);

const Exercise = sequelize.define('Exercise', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: DataTypes.STRING,
  category: DataTypes.STRING,
  muscleGroup: DataTypes.STRING,
  description: DataTypes.TEXT,
  instructions: DataTypes.TEXT,
}, { tableName: 'exercises' });

const FoodItem = sequelize.define('FoodItem', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: DataTypes.STRING,
  nameTh: DataTypes.STRING,
  category: DataTypes.STRING,
  caloriesPer100g: DataTypes.FLOAT,
  proteinPer100g: DataTypes.FLOAT,
  carbsPer100g: DataTypes.FLOAT,
  fatPer100g: DataTypes.FLOAT,
  defaultServingSize: DataTypes.FLOAT,
  defaultServingUnit: DataTypes.STRING,
  imageUrl: DataTypes.STRING,
  isCustom: DataTypes.BOOLEAN,
}, { tableName: 'food_items' });

// ─── EXERCISES (100+ ท่า) ────────────────────────────────────────────────────
const exercises = [
  // CHEST
  { name: 'Bench Press', muscleGroup: 'chest', category: 'compound', description: 'Barbell flat bench press', instructions: 'Lie on bench, grip bar slightly wider than shoulder-width, lower to chest, press up.' },
  { name: 'Incline Bench Press', muscleGroup: 'chest', category: 'compound', description: 'Barbell incline bench press', instructions: 'Set bench to 30-45 degrees, press bar from upper chest upward.' },
  { name: 'Decline Bench Press', muscleGroup: 'chest', category: 'compound', description: 'Barbell decline bench press targeting lower chest', instructions: 'Set bench to decline, lower bar to lower chest, press up.' },
  { name: 'Dumbbell Bench Press', muscleGroup: 'chest', category: 'compound', description: 'Flat dumbbell bench press', instructions: 'Hold dumbbells at chest, press up until arms fully extended.' },
  { name: 'Incline Dumbbell Press', muscleGroup: 'chest', category: 'compound', description: 'Incline dumbbell press for upper chest', instructions: 'Set bench to 30-45 degrees, press dumbbells up.' },
  { name: 'Push Up', muscleGroup: 'chest', category: 'bodyweight', description: 'Classic bodyweight chest exercise', instructions: 'Place hands shoulder-width apart, lower chest to ground, push back up.' },
  { name: 'Wide Push Up', muscleGroup: 'chest', category: 'bodyweight', description: 'Wide-grip push up for outer chest', instructions: 'Hands wider than shoulder-width, lower chest to ground, push up.' },
  { name: 'Diamond Push Up', muscleGroup: 'chest', category: 'bodyweight', description: 'Close-grip push up targeting inner chest and triceps', instructions: 'Form diamond with hands under chest, lower and push up.' },
  { name: 'Dumbbell Fly', muscleGroup: 'chest', category: 'isolation', description: 'Dumbbell chest fly on flat bench', instructions: 'Lie flat, lower arms out in arc, return to start.' },
  { name: 'Incline Dumbbell Fly', muscleGroup: 'chest', category: 'isolation', description: 'Incline dumbbell fly for upper chest', instructions: 'Set bench to 30 degrees, lower dumbbells in arc, return.' },
  { name: 'Cable Fly', muscleGroup: 'chest', category: 'isolation', description: 'Cable crossover fly', instructions: 'Stand between cables, pull handles together in a hugging motion.' },
  { name: 'Low Cable Fly', muscleGroup: 'chest', category: 'isolation', description: 'Low cable fly for upper chest', instructions: 'Set cables low, pull upward and together.' },
  { name: 'Dips', muscleGroup: 'chest', category: 'bodyweight', description: 'Chest-focused parallel bar dips', instructions: 'Lean forward slightly, lower body between bars, push back up.' },
  { name: 'Chest Press Machine', muscleGroup: 'chest', category: 'compound', description: 'Machine chest press', instructions: 'Adjust seat, grip handles, press forward until arms extended.' },
  { name: 'Pec Deck Machine', muscleGroup: 'chest', category: 'isolation', description: 'Pec deck fly machine', instructions: 'Sit in machine, bring arms together in front, return slowly.' },

  // BACK
  { name: 'Deadlift', muscleGroup: 'back', category: 'compound', description: 'Conventional barbell deadlift', instructions: 'Hinge at hips, grip bar, drive through heels to stand.' },
  { name: 'Sumo Deadlift', muscleGroup: 'back', category: 'compound', description: 'Wide-stance sumo deadlift', instructions: 'Stand wide, toes pointed out, grip bar inside legs, pull up.' },
  { name: 'Romanian Deadlift', muscleGroup: 'back', category: 'compound', description: 'RDL for hamstrings and lower back', instructions: 'Hinge at hips with soft knees, lower bar along legs.' },
  { name: 'Pull Up', muscleGroup: 'back', category: 'bodyweight', description: 'Overhand grip pull-up', instructions: 'Hang from bar with overhand grip, pull chest to bar.' },
  { name: 'Chin Up', muscleGroup: 'back', category: 'bodyweight', description: 'Underhand grip chin-up', instructions: 'Hang with underhand grip, pull chest to bar.' },
  { name: 'Neutral Grip Pull Up', muscleGroup: 'back', category: 'bodyweight', description: 'Neutral grip pull-up for lats', instructions: 'Parallel handles, pull chest to bar.' },
  { name: 'Barbell Row', muscleGroup: 'back', category: 'compound', description: 'Bent-over barbell row', instructions: 'Hinge forward, pull bar to lower chest, squeeze shoulder blades.' },
  { name: 'Pendlay Row', muscleGroup: 'back', category: 'compound', description: 'Strict barbell row from floor', instructions: 'Bar on floor, row explosively to chest, return to floor each rep.' },
  { name: 'Dumbbell Row', muscleGroup: 'back', category: 'compound', description: 'Single-arm dumbbell row', instructions: 'Plant knee on bench, row dumbbell to hip, squeeze at top.' },
  { name: 'Lat Pulldown', muscleGroup: 'back', category: 'compound', description: 'Wide-grip lat pulldown', instructions: 'Grip bar wide, pull down to upper chest, control on way up.' },
  { name: 'Close Grip Pulldown', muscleGroup: 'back', category: 'compound', description: 'Close grip lat pulldown', instructions: 'Grip bar close or use handle, pull to chest.' },
  { name: 'Seated Cable Row', muscleGroup: 'back', category: 'compound', description: 'Seated cable row for mid-back', instructions: 'Sit with feet on platform, pull handle to stomach.' },
  { name: 'Face Pull', muscleGroup: 'back', category: 'isolation', description: 'Cable face pull for rear delts', instructions: 'Pull rope to face level with elbows high.' },
  { name: 'Straight Arm Pulldown', muscleGroup: 'back', category: 'isolation', description: 'Cable straight arm pulldown for lats', instructions: 'Stand at cable, pull bar down with straight arms.' },
  { name: 'T-Bar Row', muscleGroup: 'back', category: 'compound', description: 'T-bar row machine', instructions: 'Straddle bar, hinge, row to chest.' },
  { name: 'Hyperextension', muscleGroup: 'back', category: 'isolation', description: 'Back extension on GHD or bench', instructions: 'Hinge at hips, lower torso, raise to parallel.' },

  // LEGS
  { name: 'Squat', muscleGroup: 'legs', category: 'compound', description: 'Barbell back squat', instructions: 'Bar on upper back, squat to parallel, drive through heels.' },
  { name: 'Front Squat', muscleGroup: 'legs', category: 'compound', description: 'Barbell front squat', instructions: 'Bar on front delts, squat deep, stay upright.' },
  { name: 'Goblet Squat', muscleGroup: 'legs', category: 'compound', description: 'Dumbbell goblet squat', instructions: 'Hold dumbbell at chest, squat deep keeping chest up.' },
  { name: 'Bulgarian Split Squat', muscleGroup: 'legs', category: 'compound', description: 'Rear-foot elevated split squat', instructions: 'Rear foot on bench, lower front knee toward floor.' },
  { name: 'Leg Press', muscleGroup: 'legs', category: 'compound', description: '45-degree leg press machine', instructions: 'Feet shoulder-width on platform, press until legs nearly straight.' },
  { name: 'Hack Squat', muscleGroup: 'legs', category: 'compound', description: 'Hack squat machine', instructions: 'Shoulders under pads, squat down, drive up.' },
  { name: 'Romanian Deadlift', muscleGroup: 'legs', category: 'compound', description: 'RDL for hamstrings', instructions: 'Hinge at hips, feel hamstring stretch, return.' },
  { name: 'Leg Curl', muscleGroup: 'legs', category: 'isolation', description: 'Lying hamstring curl machine', instructions: 'Lie face down, curl weight toward glutes.' },
  { name: 'Seated Leg Curl', muscleGroup: 'legs', category: 'isolation', description: 'Seated hamstring curl machine', instructions: 'Sit in machine, curl weight down.' },
  { name: 'Leg Extension', muscleGroup: 'legs', category: 'isolation', description: 'Seated quad extension machine', instructions: 'Extend legs fully, lower slowly.' },
  { name: 'Standing Calf Raise', muscleGroup: 'legs', category: 'isolation', description: 'Standing calf raise', instructions: 'Rise on balls of feet, lower slowly.' },
  { name: 'Seated Calf Raise', muscleGroup: 'legs', category: 'isolation', description: 'Seated calf raise machine', instructions: 'Pads on knees, raise heels, lower slowly.' },
  { name: 'Lunges', muscleGroup: 'legs', category: 'compound', description: 'Walking dumbbell lunges', instructions: 'Step forward, lower back knee toward floor, alternate.' },
  { name: 'Reverse Lunge', muscleGroup: 'legs', category: 'compound', description: 'Backward step lunge', instructions: 'Step backward into lunge, drive front foot to stand.' },
  { name: 'Hip Thrust', muscleGroup: 'legs', category: 'compound', description: 'Barbell hip thrust for glutes', instructions: 'Shoulders on bench, drive hips to ceiling, squeeze glutes.' },
  { name: 'Glute Bridge', muscleGroup: 'legs', category: 'compound', description: 'Bodyweight glute bridge', instructions: 'Lie on back, drive hips up, squeeze glutes at top.' },
  { name: 'Step Up', muscleGroup: 'legs', category: 'compound', description: 'Dumbbell step up on box', instructions: 'Step onto box, drive knee up, step down.' },
  { name: 'Sumo Squat', muscleGroup: 'legs', category: 'compound', description: 'Wide stance sumo squat', instructions: 'Wide stance, toes out, squat deep.' },

  // SHOULDERS
  { name: 'Overhead Press', muscleGroup: 'shoulders', category: 'compound', description: 'Standing barbell overhead press', instructions: 'Press bar from shoulders to overhead, lock out arms.' },
  { name: 'Seated Dumbbell Press', muscleGroup: 'shoulders', category: 'compound', description: 'Seated dumbbell shoulder press', instructions: 'Sit upright, press dumbbells from shoulders to overhead.' },
  { name: 'Arnold Press', muscleGroup: 'shoulders', category: 'compound', description: 'Arnold dumbbell press with rotation', instructions: 'Start with palms facing you, rotate outward as you press overhead.' },
  { name: 'Lateral Raise', muscleGroup: 'shoulders', category: 'isolation', description: 'Dumbbell lateral raise for side delts', instructions: 'Raise dumbbells out to sides to shoulder height.' },
  { name: 'Cable Lateral Raise', muscleGroup: 'shoulders', category: 'isolation', description: 'Cable lateral raise', instructions: 'Pull cable out to side, control the return.' },
  { name: 'Front Raise', muscleGroup: 'shoulders', category: 'isolation', description: 'Dumbbell front raise for anterior delt', instructions: 'Raise dumbbells in front to shoulder height.' },
  { name: 'Rear Delt Fly', muscleGroup: 'shoulders', category: 'isolation', description: 'Bent-over rear delt fly', instructions: 'Hinge forward, raise dumbbells out to sides.' },
  { name: 'Shrug', muscleGroup: 'shoulders', category: 'isolation', description: 'Barbell or dumbbell shrug for traps', instructions: 'Shrug shoulders up to ears, hold briefly, lower.' },
  { name: 'Upright Row', muscleGroup: 'shoulders', category: 'compound', description: 'Barbell upright row', instructions: 'Pull bar up along body to chin, elbows high.' },
  { name: 'Machine Shoulder Press', muscleGroup: 'shoulders', category: 'compound', description: 'Shoulder press machine', instructions: 'Adjust seat, press handles overhead.' },

  // ARMS
  { name: 'Bicep Curl', muscleGroup: 'arms', category: 'isolation', description: 'Standing dumbbell bicep curl', instructions: 'Curl weights up keeping elbows fixed, squeeze at top.' },
  { name: 'Barbell Curl', muscleGroup: 'arms', category: 'isolation', description: 'Barbell bicep curl', instructions: 'Stand with barbell, curl to shoulder height.' },
  { name: 'Hammer Curl', muscleGroup: 'arms', category: 'isolation', description: 'Neutral-grip hammer curl', instructions: 'Curl with palms facing each other.' },
  { name: 'Preacher Curl', muscleGroup: 'arms', category: 'isolation', description: 'EZ-bar preacher curl', instructions: 'Rest arms on pad, curl bar up, fully extend at bottom.' },
  { name: 'Concentration Curl', muscleGroup: 'arms', category: 'isolation', description: 'Seated concentration curl', instructions: 'Rest elbow on inner thigh, curl dumbbell up.' },
  { name: 'Cable Curl', muscleGroup: 'arms', category: 'isolation', description: 'Cable bicep curl', instructions: 'Stand at cable, curl bar to chin, lower slowly.' },
  { name: 'Incline Dumbbell Curl', muscleGroup: 'arms', category: 'isolation', description: 'Incline bench bicep curl for stretch', instructions: 'Lie on incline, curl from full extension.' },
  { name: 'Tricep Pushdown', muscleGroup: 'arms', category: 'isolation', description: 'Cable tricep pushdown', instructions: 'Keep elbows fixed, push down to full extension.' },
  { name: 'Rope Pushdown', muscleGroup: 'arms', category: 'isolation', description: 'Cable rope tricep pushdown', instructions: 'Pull rope down and apart at bottom.' },
  { name: 'Skull Crusher', muscleGroup: 'arms', category: 'isolation', description: 'Lying EZ-bar tricep extension', instructions: 'Lower bar to forehead, extend arms to press up.' },
  { name: 'Overhead Tricep Extension', muscleGroup: 'arms', category: 'isolation', description: 'Dumbbell overhead tricep extension', instructions: 'Hold dumbbell overhead, lower behind head, extend.' },
  { name: 'Close Grip Bench Press', muscleGroup: 'arms', category: 'compound', description: 'Close-grip barbell bench press', instructions: 'Grip bar shoulder-width, lower to chest, press keeping elbows close.' },
  { name: 'Tricep Kickback', muscleGroup: 'arms', category: 'isolation', description: 'Dumbbell tricep kickback', instructions: 'Hinge forward, extend arm back until straight.' },
  { name: 'Diamond Push Up', muscleGroup: 'arms', category: 'bodyweight', description: 'Diamond push up for triceps', instructions: 'Hands in diamond shape, lower and push up.' },

  // CORE
  { name: 'Plank', muscleGroup: 'core', category: 'bodyweight', description: 'Standard forearm plank', instructions: 'Hold body in straight line on forearms and toes.' },
  { name: 'Side Plank', muscleGroup: 'core', category: 'bodyweight', description: 'Side plank for obliques', instructions: 'Stack feet, support on one forearm, keep hips up.' },
  { name: 'Crunch', muscleGroup: 'core', category: 'bodyweight', description: 'Basic abdominal crunch', instructions: 'Curl shoulders off floor contracting abs, lower slowly.' },
  { name: 'Bicycle Crunch', muscleGroup: 'core', category: 'bodyweight', description: 'Bicycle crunch for obliques', instructions: 'Alternate bringing elbow to opposite knee.' },
  { name: 'Russian Twist', muscleGroup: 'core', category: 'bodyweight', description: 'Seated oblique Russian twist', instructions: 'Feet off floor, twist torso side to side.' },
  { name: 'Leg Raise', muscleGroup: 'core', category: 'bodyweight', description: 'Lying leg raise for lower abs', instructions: 'Raise legs to 90 degrees, lower without touching floor.' },
  { name: 'Hanging Leg Raise', muscleGroup: 'core', category: 'bodyweight', description: 'Hanging leg raise from bar', instructions: 'Hang from bar, raise legs to 90 degrees.' },
  { name: 'Dead Bug', muscleGroup: 'core', category: 'bodyweight', description: 'Dead bug anti-rotation exercise', instructions: 'Extend opposite arm and leg, keep lower back pressed to floor.' },
  { name: 'Ab Wheel Rollout', muscleGroup: 'core', category: 'bodyweight', description: 'Ab wheel rollout', instructions: 'Roll wheel out until body extended, pull back using abs.' },
  { name: 'V-Up', muscleGroup: 'core', category: 'bodyweight', description: 'V-up full body crunch', instructions: 'Simultaneously raise legs and torso, touch toes at top.' },
  { name: 'Mountain Climber', muscleGroup: 'core', category: 'cardio', description: 'Mountain climber for core and cardio', instructions: 'In push-up position, alternate driving knees to chest.' },
  { name: 'Cable Crunch', muscleGroup: 'core', category: 'isolation', description: 'Kneeling cable crunch', instructions: 'Kneel at cable, crunch elbows to knees.' },
  { name: 'Pallof Press', muscleGroup: 'core', category: 'isolation', description: 'Anti-rotation pallof press', instructions: 'Stand perpendicular to cable, press out and resist rotation.' },

  // CARDIO
  { name: 'Running', muscleGroup: 'cardio', category: 'cardio', description: 'Outdoor or treadmill running', instructions: 'Maintain steady pace, land midfoot, keep upright posture.' },
  { name: 'Cycling', muscleGroup: 'cardio', category: 'cardio', description: 'Stationary or outdoor cycling', instructions: 'Adjust seat height, maintain steady cadence.' },
  { name: 'Jump Rope', muscleGroup: 'cardio', category: 'cardio', description: 'Jump rope cardio', instructions: 'Jump with both feet, keep jumps low, steady rhythm.' },
  { name: 'HIIT', muscleGroup: 'cardio', category: 'cardio', description: 'High-intensity interval training', instructions: 'Alternate between max effort and recovery periods.' },
  { name: 'Swimming', muscleGroup: 'cardio', category: 'cardio', description: 'Freestyle swimming', instructions: 'Rotate strokes, maintain breathing rhythm.' },
  { name: 'Rowing Machine', muscleGroup: 'cardio', category: 'cardio', description: 'Rowing ergometer', instructions: 'Drive with legs first, then lean back, then pull arms.' },
  { name: 'Stair Climber', muscleGroup: 'cardio', category: 'cardio', description: 'Stair climbing machine', instructions: 'Step at steady pace, stay upright, avoid leaning on rails.' },
  { name: 'Elliptical', muscleGroup: 'cardio', category: 'cardio', description: 'Elliptical trainer', instructions: 'Push and pull handles, maintain steady stride.' },
  { name: 'Burpee', muscleGroup: 'cardio', category: 'cardio', description: 'Full body burpee', instructions: 'Drop to push-up, jump feet to hands, jump up overhead.' },
  { name: 'Box Jump', muscleGroup: 'cardio', category: 'cardio', description: 'Plyometric box jump', instructions: 'Bend knees, swing arms, jump onto box, step down.' },
  { name: 'Jumping Jacks', muscleGroup: 'cardio', category: 'cardio', description: 'Jumping jacks', instructions: 'Jump feet out while raising arms, return to start.' },
  { name: 'Battle Ropes', muscleGroup: 'cardio', category: 'cardio', description: 'Battle rope waves', instructions: 'Alternate arms creating waves, maintain for duration.' },

  // FULL BODY
  { name: 'Thruster', muscleGroup: 'full_body', category: 'compound', description: 'Barbell or dumbbell thruster', instructions: 'Front squat to overhead press in one fluid motion.' },
  { name: 'Clean and Press', muscleGroup: 'full_body', category: 'compound', description: 'Power clean to overhead press', instructions: 'Pull bar from floor to shoulders, press overhead.' },
  { name: 'Kettlebell Swing', muscleGroup: 'full_body', category: 'compound', description: 'Two-hand kettlebell swing', instructions: 'Hinge at hips, swing bell to shoulder height, hike back.' },
  { name: 'Turkish Get Up', muscleGroup: 'full_body', category: 'compound', description: 'Kettlebell Turkish get up', instructions: 'From lying to standing while holding weight overhead.' },
  { name: 'Medicine Ball Slam', muscleGroup: 'full_body', category: 'compound', description: 'Medicine ball slam', instructions: 'Raise ball overhead, slam to ground with full force.' },
];

// ─── FOOD ITEMS (150+ เมนู พร้อมรูป) ────────────────────────────────────────
const img = (keyword) => `https://source.unsplash.com/400x300/?${encodeURIComponent(keyword)},food`;

const foodItems = [
  // ── ข้าวและธัญพืช ─────────────────────────────────────────────────────────
  { name: 'Jasmine Rice (Cooked)', nameTh: 'ข้าวสวย', category: 'grains', caloriesPer100g: 130, proteinPer100g: 2.7, carbsPer100g: 28.2, fatPer100g: 0.3, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400' },
  { name: 'Brown Rice (Cooked)', nameTh: 'ข้าวกล้อง', category: 'grains', caloriesPer100g: 123, proteinPer100g: 2.6, carbsPer100g: 25.6, fatPer100g: 0.9, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
  { name: 'Oatmeal (Cooked)', nameTh: 'โอ๊ตมีลต้ม', category: 'grains', caloriesPer100g: 71, proteinPer100g: 2.5, carbsPer100g: 12.0, fatPer100g: 1.5, defaultServingSize: 250, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=400' },
  { name: 'Oatmeal (Dry)', nameTh: 'โอ๊ตมีล (แห้ง)', category: 'grains', caloriesPer100g: 389, proteinPer100g: 16.9, carbsPer100g: 66.3, fatPer100g: 6.9, defaultServingSize: 80, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=400' },
  { name: 'Quinoa (Cooked)', nameTh: 'ควินัว', category: 'grains', caloriesPer100g: 120, proteinPer100g: 4.4, carbsPer100g: 21.3, fatPer100g: 1.9, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400' },
  { name: 'Whole Wheat Bread', nameTh: 'ขนมปังโฮลวีท', category: 'grains', caloriesPer100g: 247, proteinPer100g: 13.0, carbsPer100g: 41.0, fatPer100g: 3.4, defaultServingSize: 60, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { name: 'White Bread', nameTh: 'ขนมปังขาว', category: 'grains', caloriesPer100g: 265, proteinPer100g: 9.0, carbsPer100g: 49.0, fatPer100g: 3.2, defaultServingSize: 60, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400' },
  { name: 'Sweet Potato (Cooked)', nameTh: 'มันเทศต้ม', category: 'vegetables', caloriesPer100g: 86, proteinPer100g: 1.6, carbsPer100g: 20.1, fatPer100g: 0.1, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=400' },
  { name: 'Corn (Cooked)', nameTh: 'ข้าวโพดต้ม', category: 'grains', caloriesPer100g: 96, proteinPer100g: 3.4, carbsPer100g: 21.0, fatPer100g: 1.5, defaultServingSize: 100, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400' },
  { name: 'Potato (Boiled)', nameTh: 'มันฝรั่งต้ม', category: 'vegetables', caloriesPer100g: 87, proteinPer100g: 1.9, carbsPer100g: 20.1, fatPer100g: 0.1, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400' },

  // ── โปรตีน ────────────────────────────────────────────────────────────────
  { name: 'Chicken Breast (Raw)', nameTh: 'อกไก่', category: 'protein', caloriesPer100g: 120, proteinPer100g: 22.5, carbsPer100g: 0.0, fatPer100g: 2.6, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400' },
  { name: 'Steamed Chicken Breast', nameTh: 'ไก่ต้ม (อก)', category: 'protein', caloriesPer100g: 165, proteinPer100g: 31.0, carbsPer100g: 0.0, fatPer100g: 3.6, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400' },
  { name: 'Chicken Thigh', nameTh: 'สะโพกไก่', category: 'protein', caloriesPer100g: 177, proteinPer100g: 18.0, carbsPer100g: 0.0, fatPer100g: 11.0, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c1?w=400' },
  { name: 'Grilled Chicken', nameTh: 'ไก่ย่าง', category: 'protein', caloriesPer100g: 195, proteinPer100g: 29.0, carbsPer100g: 0.0, fatPer100g: 8.5, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1532636875304-0c89119d9b4d?w=400' },
  { name: 'Boiled Egg', nameTh: 'ไข่ต้ม', category: 'protein', caloriesPer100g: 155, proteinPer100g: 13.0, carbsPer100g: 1.1, fatPer100g: 10.6, defaultServingSize: 55, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400' },
  { name: 'Whole Egg', nameTh: 'ไข่ไก่', category: 'protein', caloriesPer100g: 155, proteinPer100g: 13.0, carbsPer100g: 1.1, fatPer100g: 10.6, defaultServingSize: 55, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1569288052389-dac9b0ac9eac?w=400' },
  { name: 'Egg White', nameTh: 'ไข่ขาว', category: 'protein', caloriesPer100g: 52, proteinPer100g: 11.0, carbsPer100g: 0.7, fatPer100g: 0.2, defaultServingSize: 100, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400' },
  { name: 'Salmon (Raw)', nameTh: 'ปลาแซลมอน', category: 'protein', caloriesPer100g: 208, proteinPer100g: 20.0, carbsPer100g: 0.0, fatPer100g: 13.4, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400' },
  { name: 'Tuna (Canned in Water)', nameTh: 'ทูน่ากระป๋อง', category: 'protein', caloriesPer100g: 116, proteinPer100g: 25.5, carbsPer100g: 0.0, fatPer100g: 0.9, defaultServingSize: 85, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1597733153203-a54d0fbc47de?w=400' },
  { name: 'Steamed Mackerel', nameTh: 'ปลาทูนึ่ง', category: 'protein', caloriesPer100g: 158, proteinPer100g: 22.0, carbsPer100g: 0.0, fatPer100g: 7.5, defaultServingSize: 100, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400' },
  { name: 'Tilapia (Cooked)', nameTh: 'ปลานิล', category: 'protein', caloriesPer100g: 128, proteinPer100g: 26.0, carbsPer100g: 0.0, fatPer100g: 2.7, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=400' },
  { name: 'Shrimp (Cooked)', nameTh: 'กุ้ง', category: 'protein', caloriesPer100g: 99, proteinPer100g: 24.0, carbsPer100g: 0.0, fatPer100g: 0.3, defaultServingSize: 100, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400' },
  { name: 'Pork Tenderloin', nameTh: 'หมูสันใน', category: 'protein', caloriesPer100g: 143, proteinPer100g: 26.0, carbsPer100g: 0.0, fatPer100g: 3.5, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=400' },
  { name: 'Lean Beef', nameTh: 'เนื้อวัวไม่ติดมัน', category: 'protein', caloriesPer100g: 215, proteinPer100g: 26.0, carbsPer100g: 0.0, fatPer100g: 12.0, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400' },
  { name: 'White Tofu', nameTh: 'เต้าหู้ขาว', category: 'protein', caloriesPer100g: 76, proteinPer100g: 8.0, carbsPer100g: 1.9, fatPer100g: 4.2, defaultServingSize: 100, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
  { name: 'Firm Tofu', nameTh: 'เต้าหู้แข็ง', category: 'protein', caloriesPer100g: 144, proteinPer100g: 17.0, carbsPer100g: 2.2, fatPer100g: 8.7, defaultServingSize: 100, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
  { name: 'Whey Protein Powder', nameTh: 'เวย์โปรตีน', category: 'supplements', caloriesPer100g: 370, proteinPer100g: 75.0, carbsPer100g: 10.0, fatPer100g: 5.0, defaultServingSize: 30, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400' },

  // ── นม/ผลิตภัณฑ์นม ───────────────────────────────────────────────────────
  { name: 'Whole Milk', nameTh: 'นมสด', category: 'dairy', caloriesPer100g: 61, proteinPer100g: 3.2, carbsPer100g: 4.8, fatPer100g: 3.3, defaultServingSize: 240, defaultServingUnit: 'ml', imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400' },
  { name: 'Low Fat Milk', nameTh: 'นมไขมันต่ำ', category: 'dairy', caloriesPer100g: 42, proteinPer100g: 3.4, carbsPer100g: 5.0, fatPer100g: 1.0, defaultServingSize: 240, defaultServingUnit: 'ml', imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400' },
  { name: 'Greek Yogurt (Plain)', nameTh: 'กรีกโยเกิร์ต', category: 'dairy', caloriesPer100g: 59, proteinPer100g: 10.0, carbsPer100g: 3.6, fatPer100g: 0.4, defaultServingSize: 200, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400' },
  { name: 'Yogurt (Plain)', nameTh: 'โยเกิร์ตรสธรรมชาติ', category: 'dairy', caloriesPer100g: 61, proteinPer100g: 3.5, carbsPer100g: 4.7, fatPer100g: 3.3, defaultServingSize: 200, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400' },
  { name: 'Cottage Cheese', nameTh: 'คอทเทจชีส', category: 'dairy', caloriesPer100g: 98, proteinPer100g: 11.1, carbsPer100g: 3.4, fatPer100g: 4.3, defaultServingSize: 100, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400' },
  { name: 'Cheddar Cheese', nameTh: 'เชดดาร์ชีส', category: 'dairy', caloriesPer100g: 403, proteinPer100g: 25.0, carbsPer100g: 1.3, fatPer100g: 33.0, defaultServingSize: 30, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400' },

  // ── ผักสด ─────────────────────────────────────────────────────────────────
  { name: 'Broccoli', nameTh: 'บรอกโคลี', category: 'vegetables', caloriesPer100g: 34, proteinPer100g: 2.8, carbsPer100g: 6.6, fatPer100g: 0.4, defaultServingSize: 100, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400' },
  { name: 'Spinach', nameTh: 'ผักโขม', category: 'vegetables', caloriesPer100g: 23, proteinPer100g: 2.9, carbsPer100g: 3.6, fatPer100g: 0.4, defaultServingSize: 100, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400' },
  { name: 'Snow Peas', nameTh: 'ถั่วลันเตา', category: 'vegetables', caloriesPer100g: 42, proteinPer100g: 2.8, carbsPer100g: 7.5, fatPer100g: 0.2, defaultServingSize: 100, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1550358864-518f202c02ba?w=400' },
  { name: 'Kale', nameTh: 'เคล', category: 'vegetables', caloriesPer100g: 49, proteinPer100g: 4.3, carbsPer100g: 8.8, fatPer100g: 0.9, defaultServingSize: 100, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=400' },
  { name: 'Carrot', nameTh: 'แครอท', category: 'vegetables', caloriesPer100g: 41, proteinPer100g: 0.9, carbsPer100g: 9.6, fatPer100g: 0.2, defaultServingSize: 100, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400' },
  { name: 'Cucumber', nameTh: 'แตงกวา', category: 'vegetables', caloriesPer100g: 16, proteinPer100g: 0.7, carbsPer100g: 3.6, fatPer100g: 0.1, defaultServingSize: 100, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400' },
  { name: 'Tomato', nameTh: 'มะเขือเทศ', category: 'vegetables', caloriesPer100g: 18, proteinPer100g: 0.9, carbsPer100g: 3.9, fatPer100g: 0.2, defaultServingSize: 100, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400' },
  { name: 'Bell Pepper', nameTh: 'พริกหวาน', category: 'vegetables', caloriesPer100g: 31, proteinPer100g: 1.0, carbsPer100g: 6.0, fatPer100g: 0.3, defaultServingSize: 100, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400' },
  { name: 'Mushroom', nameTh: 'เห็ด', category: 'vegetables', caloriesPer100g: 22, proteinPer100g: 3.1, carbsPer100g: 3.3, fatPer100g: 0.3, defaultServingSize: 100, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1552825897-bb4ac24f66a9?w=400' },
  { name: 'Asparagus', nameTh: 'หน่อไม้ฝรั่ง', category: 'vegetables', caloriesPer100g: 20, proteinPer100g: 2.2, carbsPer100g: 3.9, fatPer100g: 0.1, defaultServingSize: 100, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1515471209610-d130b31a4d2a?w=400' },
  { name: 'Baby Spinach Salad', nameTh: 'สลัดผักโขม', category: 'vegetables', caloriesPer100g: 20, proteinPer100g: 2.5, carbsPer100g: 3.2, fatPer100g: 0.3, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400' },

  // ── ผลไม้ ─────────────────────────────────────────────────────────────────
  { name: 'Banana', nameTh: 'กล้วยหอม', category: 'fruits', caloriesPer100g: 89, proteinPer100g: 1.1, carbsPer100g: 22.8, fatPer100g: 0.3, defaultServingSize: 120, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400' },
  { name: 'Kluay Nam Wa Banana', nameTh: 'กล้วยน้ำว้า', category: 'fruits', caloriesPer100g: 99, proteinPer100g: 1.3, carbsPer100g: 26.0, fatPer100g: 0.3, defaultServingSize: 80, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400' },
  { name: 'Apple', nameTh: 'แอปเปิล', category: 'fruits', caloriesPer100g: 52, proteinPer100g: 0.3, carbsPer100g: 13.8, fatPer100g: 0.2, defaultServingSize: 180, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400' },
  { name: 'Orange', nameTh: 'ส้ม', category: 'fruits', caloriesPer100g: 47, proteinPer100g: 0.9, carbsPer100g: 11.8, fatPer100g: 0.1, defaultServingSize: 130, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400' },
  { name: 'Mango', nameTh: 'มะม่วง', category: 'fruits', caloriesPer100g: 60, proteinPer100g: 0.8, carbsPer100g: 15.0, fatPer100g: 0.4, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400' },
  { name: 'Watermelon', nameTh: 'แตงโม', category: 'fruits', caloriesPer100g: 30, proteinPer100g: 0.6, carbsPer100g: 7.6, fatPer100g: 0.2, defaultServingSize: 200, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=400' },
  { name: 'Strawberry', nameTh: 'สตรอว์เบอร์รี', category: 'fruits', caloriesPer100g: 32, proteinPer100g: 0.7, carbsPer100g: 7.7, fatPer100g: 0.3, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400' },
  { name: 'Blueberry', nameTh: 'บลูเบอร์รี', category: 'fruits', caloriesPer100g: 57, proteinPer100g: 0.7, carbsPer100g: 14.5, fatPer100g: 0.3, defaultServingSize: 100, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400' },
  { name: 'Avocado', nameTh: 'อาโวคาโด', category: 'fruits', caloriesPer100g: 160, proteinPer100g: 2.0, carbsPer100g: 8.5, fatPer100g: 14.7, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=400' },
  { name: 'Papaya', nameTh: 'มะละกอ', category: 'fruits', caloriesPer100g: 43, proteinPer100g: 0.5, carbsPer100g: 10.8, fatPer100g: 0.3, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400' },
  { name: 'Pineapple', nameTh: 'สับปะรด', category: 'fruits', caloriesPer100g: 50, proteinPer100g: 0.5, carbsPer100g: 13.1, fatPer100g: 0.1, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=400' },
  { name: 'Dragon Fruit', nameTh: 'แก้วมังกร', category: 'fruits', caloriesPer100g: 60, proteinPer100g: 1.2, carbsPer100g: 13.0, fatPer100g: 0.4, defaultServingSize: 150, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1560155016-bd4879ae2196?w=400' },

  // ── เมนูไทย ───────────────────────────────────────────────────────────────
  { name: 'Krapao Chicken with Fried Egg', nameTh: 'กะเพราไก่ไข่ดาว', category: 'thai_dish', caloriesPer100g: 185, proteinPer100g: 14.0, carbsPer100g: 8.0, fatPer100g: 11.0, defaultServingSize: 300, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400' },
  { name: 'Khao Man Gai', nameTh: 'ข้าวมันไก่', category: 'thai_dish', caloriesPer100g: 155, proteinPer100g: 10.0, carbsPer100g: 22.0, fatPer100g: 3.5, defaultServingSize: 350, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400' },
  { name: 'Som Tam', nameTh: 'ส้มตำ', category: 'thai_dish', caloriesPer100g: 58, proteinPer100g: 2.5, carbsPer100g: 10.0, fatPer100g: 1.5, defaultServingSize: 200, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400' },
  { name: 'Tom Yum Goong', nameTh: 'ต้มยำกุ้ง', category: 'thai_dish', caloriesPer100g: 48, proteinPer100g: 5.0, carbsPer100g: 4.0, fatPer100g: 1.5, defaultServingSize: 350, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400' },
  { name: 'Pad Thai', nameTh: 'ผัดไทย', category: 'thai_dish', caloriesPer100g: 181, proteinPer100g: 8.5, carbsPer100g: 24.0, fatPer100g: 6.0, defaultServingSize: 300, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400' },
  { name: 'Green Curry Chicken', nameTh: 'แกงเขียวหวานไก่', category: 'thai_dish', caloriesPer100g: 142, proteinPer100g: 10.0, carbsPer100g: 7.0, fatPer100g: 9.0, defaultServingSize: 300, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400' },
  { name: 'Massaman Curry', nameTh: 'แกงมัสมั่น', category: 'thai_dish', caloriesPer100g: 165, proteinPer100g: 9.0, carbsPer100g: 10.0, fatPer100g: 11.0, defaultServingSize: 300, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400' },
  { name: 'Stir-Fried Mixed Vegetables', nameTh: 'ผัดผักรวม', category: 'thai_dish', caloriesPer100g: 65, proteinPer100g: 3.0, carbsPer100g: 7.0, fatPer100g: 3.0, defaultServingSize: 200, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1512058556646-c4da40fba323?w=400' },
  { name: 'Larb Chicken', nameTh: 'ลาบไก่', category: 'thai_dish', caloriesPer100g: 120, proteinPer100g: 16.0, carbsPer100g: 5.0, fatPer100g: 4.0, defaultServingSize: 200, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400' },
  { name: 'Khao Pad Gai', nameTh: 'ข้าวผัดไก่', category: 'thai_dish', caloriesPer100g: 170, proteinPer100g: 9.0, carbsPer100g: 22.0, fatPer100g: 5.0, defaultServingSize: 300, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400' },
  { name: 'Tom Kha Gai', nameTh: 'ต้มข่าไก่', category: 'thai_dish', caloriesPer100g: 110, proteinPer100g: 9.0, carbsPer100g: 4.0, fatPer100g: 7.0, defaultServingSize: 300, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400' },
  { name: 'Pad See Ew', nameTh: 'ผัดซีอิ้ว', category: 'thai_dish', caloriesPer100g: 175, proteinPer100g: 10.0, carbsPer100g: 24.0, fatPer100g: 5.5, defaultServingSize: 300, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400' },
  { name: 'Khao Niew Mamuang', nameTh: 'ข้าวเหนียวมะม่วง', category: 'thai_dish', caloriesPer100g: 210, proteinPer100g: 3.5, carbsPer100g: 42.0, fatPer100g: 3.5, defaultServingSize: 250, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400' },
  { name: 'Grilled Pork with Rice', nameTh: 'หมูย่างข้าว', category: 'thai_dish', caloriesPer100g: 195, proteinPer100g: 14.0, carbsPer100g: 22.0, fatPer100g: 6.0, defaultServingSize: 300, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=400' },
  { name: 'Boat Noodle', nameTh: 'ก๋วยเตี๋ยวเรือ', category: 'thai_dish', caloriesPer100g: 85, proteinPer100g: 7.0, carbsPer100g: 10.0, fatPer100g: 2.0, defaultServingSize: 300, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400' },

  // ── ถั่วและไขมันดี ────────────────────────────────────────────────────────
  { name: 'Almonds', nameTh: 'อัลมอนด์', category: 'nuts', caloriesPer100g: 579, proteinPer100g: 21.2, carbsPer100g: 21.6, fatPer100g: 49.9, defaultServingSize: 30, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400' },
  { name: 'Cashews', nameTh: 'มะม่วงหิมพานต์', category: 'nuts', caloriesPer100g: 553, proteinPer100g: 18.2, carbsPer100g: 30.2, fatPer100g: 43.9, defaultServingSize: 30, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400' },
  { name: 'Peanut Butter', nameTh: 'เนยถั่ว', category: 'nuts', caloriesPer100g: 588, proteinPer100g: 25.1, carbsPer100g: 20.1, fatPer100g: 50.4, defaultServingSize: 32, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1558252425-93871e307b4a?w=400' },
  { name: 'Walnuts', nameTh: 'วอลนัท', category: 'nuts', caloriesPer100g: 654, proteinPer100g: 15.2, carbsPer100g: 13.7, fatPer100g: 65.2, defaultServingSize: 30, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400' },
  { name: 'Olive Oil', nameTh: 'น้ำมันมะกอก', category: 'fats', caloriesPer100g: 884, proteinPer100g: 0.0, carbsPer100g: 0.0, fatPer100g: 100.0, defaultServingSize: 15, defaultServingUnit: 'ml', imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400' },
  { name: 'Chia Seeds', nameTh: 'เมล็ดเจีย', category: 'nuts', caloriesPer100g: 486, proteinPer100g: 16.5, carbsPer100g: 42.1, fatPer100g: 30.7, defaultServingSize: 20, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1514995428455-447d4443fa7f?w=400' },

  // ── เครื่องดื่ม ───────────────────────────────────────────────────────────
  { name: 'Black Coffee', nameTh: 'กาแฟดำ', category: 'beverages', caloriesPer100g: 2, proteinPer100g: 0.3, carbsPer100g: 0.0, fatPer100g: 0.0, defaultServingSize: 240, defaultServingUnit: 'ml', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400' },
  { name: 'Protein Shake', nameTh: 'โปรตีนเชค', category: 'supplements', caloriesPer100g: 60, proteinPer100g: 8.0, carbsPer100g: 5.0, fatPer100g: 1.0, defaultServingSize: 300, defaultServingUnit: 'ml', imageUrl: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400' },
  { name: 'Green Tea', nameTh: 'ชาเขียว', category: 'beverages', caloriesPer100g: 1, proteinPer100g: 0.0, carbsPer100g: 0.2, fatPer100g: 0.0, defaultServingSize: 240, defaultServingUnit: 'ml', imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400' },
  { name: 'Orange Juice (Fresh)', nameTh: 'น้ำส้มคั้น', category: 'beverages', caloriesPer100g: 45, proteinPer100g: 0.7, carbsPer100g: 10.4, fatPer100g: 0.2, defaultServingSize: 240, defaultServingUnit: 'ml', imageUrl: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=400' },

  // ── อาหาร Clean Eating ────────────────────────────────────────────────────
  { name: 'Grilled Salmon with Vegetables', nameTh: 'แซลมอนย่างผัก', category: 'clean_meal', caloriesPer100g: 155, proteinPer100g: 18.0, carbsPer100g: 5.0, fatPer100g: 7.0, defaultServingSize: 350, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400' },
  { name: 'Chicken Rice Bowl', nameTh: 'ข้าวหน้าไก่', category: 'clean_meal', caloriesPer100g: 145, proteinPer100g: 12.0, carbsPer100g: 18.0, fatPer100g: 3.0, defaultServingSize: 350, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
  { name: 'Tuna Salad', nameTh: 'สลัดทูน่า', category: 'clean_meal', caloriesPer100g: 90, proteinPer100g: 14.0, carbsPer100g: 4.0, fatPer100g: 2.0, defaultServingSize: 250, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400' },
  { name: 'Egg White Omelette', nameTh: 'ออมเลตไข่ขาว', category: 'clean_meal', caloriesPer100g: 80, proteinPer100g: 11.0, carbsPer100g: 1.5, fatPer100g: 3.5, defaultServingSize: 200, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400' },
  { name: 'Overnight Oats', nameTh: 'โอ๊ตแช่คืน', category: 'clean_meal', caloriesPer100g: 130, proteinPer100g: 6.0, carbsPer100g: 20.0, fatPer100g: 3.0, defaultServingSize: 250, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=400' },
  { name: 'Acai Bowl', nameTh: 'อาซาอิโบล', category: 'clean_meal', caloriesPer100g: 120, proteinPer100g: 3.0, carbsPer100g: 20.0, fatPer100g: 4.0, defaultServingSize: 300, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400' },
  { name: 'Buddha Bowl', nameTh: 'บุดด้าโบล', category: 'clean_meal', caloriesPer100g: 100, proteinPer100g: 6.0, carbsPer100g: 13.0, fatPer100g: 3.0, defaultServingSize: 400, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400' },
  { name: 'Beef Steak', nameTh: 'สเต็กเนื้อ', category: 'clean_meal', caloriesPer100g: 271, proteinPer100g: 26.0, carbsPer100g: 0.0, fatPer100g: 18.0, defaultServingSize: 200, defaultServingUnit: 'g', imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400' },
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to production DB');

    // Insert exercises (skip duplicates)
    let exAdded = 0;
    for (const ex of exercises) {
      const [, created] = await Exercise.findOrCreate({ where: { name: ex.name }, defaults: ex });
      if (created) exAdded++;
    }
    console.log(`✅ Exercises: added ${exAdded} new (${exercises.length} total processed)`);

    // Insert food items (skip duplicates)
    let foodAdded = 0;
    for (const food of foodItems) {
      const [, created] = await FoodItem.findOrCreate({ where: { name: food.name }, defaults: food });
      if (created) foodAdded++;
    }
    console.log(`✅ Food items: added ${foodAdded} new (${foodItems.length} total processed)`);

    console.log('🎉 Seed completed!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
