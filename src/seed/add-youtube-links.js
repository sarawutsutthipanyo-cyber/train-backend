require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
  { host: process.env.DB_HOST, port: Number(process.env.DB_PORT) || 5432, dialect: 'postgres', logging: false, dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } }
);

const Exercise = sequelize.define('Exercise', {
  id: { type: DataTypes.UUID, primaryKey: true },
  name: DataTypes.STRING,
  youtubeUrl: DataTypes.STRING,
}, { tableName: 'exercises' });

const links = {
  // CHEST
  'Bench Press':              'https://www.youtube.com/watch?v=vcBig73ojpE',
  'Incline Bench Press':      'https://www.youtube.com/watch?v=DbFgADa2PL8',
  'Decline Bench Press':      'https://www.youtube.com/watch?v=LfyQBUKR8SE',
  'Dumbbell Bench Press':     'https://www.youtube.com/watch?v=VmB1G1K7v94',
  'Incline Dumbbell Press':   'https://www.youtube.com/watch?v=8iPEnn-ltC8',
  'Push Up':                  'https://www.youtube.com/watch?v=IODxDxX7oi4',
  'Wide Push Up':             'https://www.youtube.com/watch?v=0pkjOk0EiAk',
  'Diamond Push Up':          'https://www.youtube.com/watch?v=J0DXl9oezKo',
  'Dumbbell Fly':             'https://www.youtube.com/watch?v=eozdVDA78K0',
  'Incline Dumbbell Fly':     'https://www.youtube.com/watch?v=Ls_zNNBj4io',
  'Cable Fly':                'https://www.youtube.com/watch?v=Iwe6AmxVf7o',
  'Low Cable Fly':            'https://www.youtube.com/watch?v=H8HoMFsSOyM',
  'Dips':                     'https://www.youtube.com/watch?v=yN6Q1UI_xkE',
  'Chest Press Machine':      'https://www.youtube.com/watch?v=xUm0BiZCWlQ',
  'Pec Deck Machine':         'https://www.youtube.com/watch?v=Z57CtFmRMxA',

  // BACK
  'Deadlift':                 'https://www.youtube.com/watch?v=op9kVnSso6Q',
  'Sumo Deadlift':            'https://www.youtube.com/watch?v=TSGQ4aL3wSI',
  'Romanian Deadlift':        'https://www.youtube.com/watch?v=JCXUYuzwNrM',
  'Pull Up':                  'https://www.youtube.com/watch?v=eGo4IYlbE5g',
  'Chin Up':                  'https://www.youtube.com/watch?v=b-ztMQpj8yc',
  'Neutral Grip Pull Up':     'https://www.youtube.com/watch?v=5HdBvLg3Qak',
  'Barbell Row':              'https://www.youtube.com/watch?v=FWJR5Ve8bnQ',
  'Pendlay Row':              'https://www.youtube.com/watch?v=Weu9HMHdiDA',
  'Dumbbell Row':             'https://www.youtube.com/watch?v=roCP6wCXPqo',
  'Lat Pulldown':             'https://www.youtube.com/watch?v=CAwf7n6Luuc',
  'Close Grip Pulldown':      'https://www.youtube.com/watch?v=oBpit_9sTYE',
  'Seated Cable Row':         'https://www.youtube.com/watch?v=GZbfZ033f74',
  'Face Pull':                'https://www.youtube.com/watch?v=rep-qVOkqgk',
  'Straight Arm Pulldown':    'https://www.youtube.com/watch?v=kMDROl-nmc0',
  'T-Bar Row':                'https://www.youtube.com/watch?v=j3Igk5nyZE4',
  'Hyperextension':           'https://www.youtube.com/watch?v=ph3pddpKzzw',

  // LEGS
  'Squat':                    'https://www.youtube.com/watch?v=bEv6CCg2BC8',
  'Front Squat':              'https://www.youtube.com/watch?v=uYumuL_G_V0',
  'Goblet Squat':             'https://www.youtube.com/watch?v=MeIiIdhvXT4',
  'Bulgarian Split Squat':    'https://www.youtube.com/watch?v=2C-uNgKwPLE',
  'Leg Press':                'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
  'Hack Squat':               'https://www.youtube.com/watch?v=0tn5K9NlCfo',
  'Leg Curl':                 'https://www.youtube.com/watch?v=1Tq3QdYUuHs',
  'Seated Leg Curl':          'https://www.youtube.com/watch?v=oFxEDkppbSQ',
  'Leg Extension':            'https://www.youtube.com/watch?v=YyvSfVjQeL0',
  'Standing Calf Raise':      'https://www.youtube.com/watch?v=wxwzDEHCvFQ',
  'Seated Calf Raise':        'https://www.youtube.com/watch?v=JbyjNymZOt0',
  'Lunges':                   'https://www.youtube.com/watch?v=QOVaHwm-Q6U',
  'Reverse Lunge':            'https://www.youtube.com/watch?v=xrPteyQLGAo',
  'Hip Thrust':               'https://www.youtube.com/watch?v=xDmFkJxPzeM',
  'Glute Bridge':             'https://www.youtube.com/watch?v=OUgsJ8-Vi0E',
  'Step Up':                  'https://www.youtube.com/watch?v=dQqApCGd5Ss',
  'Sumo Squat':               'https://www.youtube.com/watch?v=qFTRm5NqBOQ',

  // SHOULDERS
  'Overhead Press':           'https://www.youtube.com/watch?v=2yjwXTZQDDI',
  'Seated Dumbbell Press':    'https://www.youtube.com/watch?v=HzIiNhHhhtA',
  'Arnold Press':             'https://www.youtube.com/watch?v=6Z15_WdXmVw',
  'Lateral Raise':            'https://www.youtube.com/watch?v=3VcKaXpzqRo',
  'Cable Lateral Raise':      'https://www.youtube.com/watch?v=PPbc4gmFbRo',
  'Front Raise':              'https://www.youtube.com/watch?v=gkSYRCLnqvQ',
  'Rear Delt Fly':            'https://www.youtube.com/watch?v=EA7u4Q_8HQ0',
  'Shrug':                    'https://www.youtube.com/watch?v=cJRVVxmytaM',
  'Upright Row':              'https://www.youtube.com/watch?v=VCMqnJXtl2M',
  'Machine Shoulder Press':   'https://www.youtube.com/watch?v=Wqq43dKW1TU',

  // ARMS
  'Bicep Curl':               'https://www.youtube.com/watch?v=ykJmrZ5v0Oo',
  'Barbell Curl':             'https://www.youtube.com/watch?v=kwG2ipFRgfo',
  'Hammer Curl':              'https://www.youtube.com/watch?v=zC3nLlEvin4',
  'Preacher Curl':            'https://www.youtube.com/watch?v=fIWP-FRFNU0',
  'Concentration Curl':       'https://www.youtube.com/watch?v=0AUGkch3tzc',
  'Cable Curl':               'https://www.youtube.com/watch?v=NFzTWp2qpiE',
  'Incline Dumbbell Curl':    'https://www.youtube.com/watch?v=soxrZlIl35U',
  'Tricep Pushdown':          'https://www.youtube.com/watch?v=2-LAMcpzODU',
  'Rope Pushdown':            'https://www.youtube.com/watch?v=kiuVA0gs3EI',
  'Skull Crusher':            'https://www.youtube.com/watch?v=d_KZxkY_0cM',
  'Overhead Tricep Extension':'https://www.youtube.com/watch?v=nRiJVZDpdL0',
  'Close Grip Bench Press':   'https://www.youtube.com/watch?v=nEF0bv2FW94',
  'Tricep Kickback':          'https://www.youtube.com/watch?v=6SS6K3lAwZ8',
  'Diamond Push Up':          'https://www.youtube.com/watch?v=J0DXl9oezKo',

  // CORE
  'Plank':                    'https://www.youtube.com/watch?v=ASdvN_XEl_c',
  'Side Plank':               'https://www.youtube.com/watch?v=K2aAe4QB_E0',
  'Crunch':                   'https://www.youtube.com/watch?v=MKmrqcoCZ-M',
  'Bicycle Crunch':           'https://www.youtube.com/watch?v=9FGilxCbdz8',
  'Russian Twist':            'https://www.youtube.com/watch?v=wkD8rjkodUI',
  'Leg Raise':                'https://www.youtube.com/watch?v=JB2oyawG9KI',
  'Hanging Leg Raise':        'https://www.youtube.com/watch?v=Pr1ieGZ5atk',
  'Dead Bug':                 'https://www.youtube.com/watch?v=4XLEnwUr1d8',
  'Ab Wheel Rollout':         'https://www.youtube.com/watch?v=sxHjG0v2-gU',
  'V-Up':                     'https://www.youtube.com/watch?v=iP2fjvG0g3w',
  'Mountain Climber':         'https://www.youtube.com/watch?v=nmwgirgXLYM',
  'Cable Crunch':             'https://www.youtube.com/watch?v=AV5PmtmE-OM',
  'Pallof Press':             'https://www.youtube.com/watch?v=AH_QZLm_0-s',

  // CARDIO
  'Running':                  'https://www.youtube.com/watch?v=brFHyOtTwH4',
  'Cycling':                  'https://www.youtube.com/watch?v=N49O70VIQi4',
  'Jump Rope':                'https://www.youtube.com/watch?v=hCuXYrTOMxI',
  'HIIT':                     'https://www.youtube.com/watch?v=ml6cT4AZdqI',
  'Swimming':                 'https://www.youtube.com/watch?v=5HLW2AI5kh8',
  'Rowing Machine':           'https://www.youtube.com/watch?v=zQ82RYIFM3k',
  'Stair Climber':            'https://www.youtube.com/watch?v=0V3rvKaRBJ8',
  'Elliptical':               'https://www.youtube.com/watch?v=GPABiMDcMoM',
  'Burpee':                   'https://www.youtube.com/watch?v=TU8QYVW0gDU',
  'Box Jump':                 'https://www.youtube.com/watch?v=52r_Ul5k03g',
  'Jumping Jacks':            'https://www.youtube.com/watch?v=c4DAnQ6DtF8',
  'Battle Ropes':             'https://www.youtube.com/watch?v=ut9pAhLxDsM',

  // FULL BODY
  'Thruster':                 'https://www.youtube.com/watch?v=L219gRDCrm4',
  'Clean and Press':          'https://www.youtube.com/watch?v=YTbCfRQ0Bf8',
  'Kettlebell Swing':         'https://www.youtube.com/watch?v=sSESeQAir2M',
  'Turkish Get Up':           'https://www.youtube.com/watch?v=0bWRPC49-KI',
  'Medicine Ball Slam':       'https://www.youtube.com/watch?v=6FDwUm7yS4E',
};

(async () => {
  await sequelize.authenticate();
  console.log('✅ Connected');

  let updated = 0;
  for (const [name, url] of Object.entries(links)) {
    const [rows] = await sequelize.query(
      `UPDATE exercises SET "youtubeUrl" = :url WHERE name = :name`,
      { replacements: { url, name } }
    );
    if (rows > 0) updated++;
  }

  console.log(`✅ อัปเดต YouTube links ${updated} ท่า`);
  process.exit(0);
})().catch(e => { console.error(e.message); process.exit(1); });
