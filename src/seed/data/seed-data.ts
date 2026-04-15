import * as bcrypt from 'bcrypt';

interface SeedUser {
  email: string;
  fullName: string;
  password: string;
  roles: Roles[];
}

type Roles = 'admin' | 'user';

interface SeedExercise {
  title: string;
  equipmentId: number;
  primaryMuscleId: number;
  secondaryMuscleIds?: number[];
  file: File;
  instruction: string[];
}

interface File {
  url: string;
  publicId: string;
}

type EquipmentName =
  | 'All Equipment'
  | 'Barbell'
  | 'Dumbbell'
  | 'Kettlebell'
  | 'Machine'
  | 'Plate'
  | 'Resistance Band'
  | 'Suspension Band'
  | 'None'
  | 'Other';

type MuscleName =
  | 'All Muscles'
  | 'Abdominals'
  | 'Abductors'
  | 'Adductors'
  | 'Biceps'
  | 'Calves'
  | 'Cardio'
  | 'Chest'
  | 'Forearms'
  | 'Full Body'
  | 'Glutes'
  | 'Hamstrings'
  | 'Lats'
  | 'Lower Back'
  | 'Neck'
  | 'Quadriceps'
  | 'Shoulders'
  | 'Traps'
  | 'Triceps'
  | 'Upper Back'
  | 'Other';

interface SeedData {
  users: SeedUser[];
  exercises: SeedExercise[];
  equipments: SeedEquipment[];
  muscles: SeedMuscle[];
}

interface SeedEquipment {
  id: number;
  name: EquipmentName;
  imageUrl: string;
}

interface SeedMuscle {
  id: number;
  name: MuscleName;
  imageUrl: string;
}

export const initialData: SeedData = {
  users: [
    {
      email: 'harold@gmail.com',
      fullName: 'Harold Gonzalez',
      password: bcrypt.hashSync('-Abc123', 10),
      roles: ['admin'],
    },
    {
      email: 'olga@google.com',
      fullName: 'Olga Mancipe',
      password: bcrypt.hashSync('-Abc123', 10),
      roles: ['user'],
    },
  ],
  exercises: [
    {
      title: 'Bench Press (Barbell)',
      equipmentId: 2,
      primaryMuscleId: 8,
      secondaryMuscleIds: [17, 19],
      instruction: [
        'Lie on the bench.',
        'Extend your arms and grab the bar evenly, having your hands slightly wider than shoulder-width apart.',
        'Bring your shoulder blades back and dig them into the bench.',
        'Arch your lower back and plant your feet flat on the floor.',
        'Take a breath, unrack the bar, and bring it over your chest.',
        'Inhale again and lower the barbell to your lower chest, tapping it slightly.',
        'Hold for a moment and press the bar until your elbows are straight. Exhale.',
      ],
      file: {
        url: 'https://res.cloudinary.com/dzwstma9h/video/upload/v1776189364/exercises/00251201-Barbell-Bench-Press_Chest_lao6do.mp4',
        publicId: 'exercises/00251201-Barbell-Bench-Press_Chest_lao6do',
      },
    },
    {
      title: 'Hack Squat (Machine)',
      equipmentId: 5,
      primaryMuscleId: 16,
      secondaryMuscleIds: [11, 12],
      instruction: [
        'Add weight to the machine.',
        'Position yourself inside the machine with your shoulders against the pad.',
        'Have your feet in a comfortable squatting stance on the platform below.',
        'Bring your shoulders back and engage your abs.',
        'Extend your knees to unrack the weight and remove the safety latch.',
        'Inhale and descend by bending your knees.',
        'Move down until your knees form a 90-degree angle.',
        'Press through your heels and straighten your legs, exhaling near the top.',
        'Once finished, put the safety on, rack the weight, and relax your body.',
      ],
      file: {
        url: 'https://res.cloudinary.com/dzwstma9h/video/upload/v1776189517/exercises/07431201-Sled-Hack-Squat_Hips_uru6sr.mp4',
        publicId: 'exercises/07431201-Sled-Hack-Squat_Hips_uru6sr',
      },
    },
    {
      title: 'Preacher Curl (Barbell)',
      equipmentId: 2,
      primaryMuscleId: 5,
      instruction: [
        'Load the bar and adjust the seat height of the preacher bench. You should be able to place your upper arms on the pad and maintain an upright torso.',
        'Position yourself over the machine, grab the bar with an even underhand grip (palms facing the ceiling), lift the bar, and sit down.',
        'Bring your shoulders back, engage your abs, and breathe in.',
        'Lower the bar until your arms are almost straight.',
        'Lift the bar until your forearms are almost upright, and breathe out.',
        'Extend your arms slowly as you breathe in.',
      ],
      file: {
        url: 'https://res.cloudinary.com/dzwstma9h/video/upload/v1776189963/exercises/00701201-Barbell-Preacher-Curl_Upper-Arms_axbemc.mp4',
        publicId: 'exercises/00701201-Barbell-Preacher-Curl_Upper-Arms_axbemc',
      },
    },
    {
      title: 'Behind the Back Curl (Cable)',
      equipmentId: 5,
      primaryMuscleId: 5,
      instruction: [
        'Set the pulleys at around mid-thigh height, attach handles, and select the load.',
        'Grab the handles one by one and stand so the pulleys are behind you.',
        'Take a couple of steps forward to lift the weights off their stacks and allow the weight to pull your elbows behind your torso.',
        'With your chest out, lean your torso slightly forward and stagger your stance (one foot forward, the other one back).',
        'Breathe in, engage your abs, and curl until your wrists are at elbow level. Squeeze your biceps and exhale.',
        'Slowly extend your arms, allowing the handles to travel behind your body, and breathe in.',
        'Repeat.',
      ],
      file: {
        url: 'https://res.cloudinary.com/dzwstma9h/video/upload/v1776226308/exercises/48381201-Cable-Unilateral-Bicep-Curl_Upper-Arms__oalnat.mp4',
        publicId:
          'exercises/48381201-Cable-Unilateral-Bicep-Curl_Upper-Arms__oalnat',
      },
    },
    {
      title: 'Skullcrusher (Barbell)',
      equipmentId: 2,
      primaryMuscleId: 19,
      instruction: [
        'Load a straight bar, lift it off the floor, and support it in front of your chest.',
        'Carefully sit on a flat gym bench and lie back while keeping the bar close to your torso.',
        'Extend your arms and bring your shoulders back. Plant your feet on the floor.',
        'Take a breath and lower the barbell to your forehead or behind your head.',
        'Pause for a moment and extend your arms while keeping your elbows in position. Exhale near the top.',
      ],
      file: {
        url: 'https://res.cloudinary.com/dzwstma9h/video/upload/v1776191210/exercises/00601201-Barbell-Lying-Triceps-Extension-Skull-Crusher_Upper-Arms_lb8qck.mp4',
        publicId:
          'exercises/00601201-Barbell-Lying-Triceps-Extension-Skull-Crusher_Upper-Arms_lb8qck',
      },
    },
    {
      title: 'Leg Press (Machine)',
      equipmentId: 5,
      primaryMuscleId: 16,
      secondaryMuscleIds: [11, 12],
      instruction: [
        'Add the appropriate weight to the leg press machine and sit down.',
        'Lift your legs and plant your feet flat on the platform. Have your feet in a comfortable position with your toes pointing slightly out.',
        'Grab the handles to your sides, bring your shoulders back, and engage your abs.',
        'Press the platform and straighten your legs while rotating the handles to remove the safety pins.',
        'Take another breath and lower the platform by bending your knees.',
        'Hold the bottom position for a moment and press the platform away as you exhale.',
        'Once finished, straighten your legs, rotate the handles to put the safety pins on, and rest.',
      ],
      file: {
        url: 'https://d2l9nsnmtah87f.cloudfront.net/exercise-assets/07391201-Sled-45-Leg-Press_Hips.mp4',
        publicId: 'exercises/07391201-Sled-45-Leg-Press_Hips',
      },
    },
    {
      title: 'Incline Bench Press (Dumbbell)',
      equipmentId: 3,
      primaryMuscleId: 8,
      secondaryMuscleIds: [17, 19],
      instruction: [
        'Set the incline of a bench at 45 degrees, grab a pair of dumbbells, and sit down.',
        'Place the dumbbells on top of your thighs, and lie back as you kick the weights up and over your torso.',
        'Bring the dumbbells to your sides, plant your feet on the floor, retract your shoulders, and take a breath. Keep your elbows somewhat tucked in.',
        'Press both dumbbells toward the ceiling, tapping them lightly at the top. Breathe out.',
        'Lower the weights to your sides, breathing in on the way down.',
      ],
      file: {
        url: 'https://res.cloudinary.com/dzwstma9h/video/upload/v1776192418/exercises/03141201-Dumbbell-Incline-Bench-Press_Chest_hgv3e5.mp4',
        publicId:
          'exercises/03141201-Dumbbell-Incline-Bench-Press_Chest_hgv3e5',
      },
    },
    {
      title: 'Shoulder Press (Dumbbell)',
      equipmentId: 3,
      primaryMuscleId: 17,
      secondaryMuscleIds: [19],
      instruction: [
        'Set an adjustable gym bench at a close to 90-degree angle (almost upright back support).',
        'Grab a pair of dumbbells and sit down.',
        'Place the weights on top of your thighs.',
        'Bring your shoulders back, engage your abs, and take a breath.',
        'Lift the dumbbells and kick them up with your thighs.',
        'Position the weights to your sides.',
        'Take another breath and press the dumbbells up and in, tapping them at the top as you exhale.',
        'Lower the dumbbells until your elbows are slightly lower than your shoulders, breathing in on the way down.',
      ],
      file: {
        url: 'https://res.cloudinary.com/dzwstma9h/video/upload/v1776192675/exercises/04051201-Dumbbell-Seated-Shoulder-Press_Shoulders_ec8qbm.mp4',
        publicId:
          'exercises/04051201-Dumbbell-Seated-Shoulder-Press_Shoulders_ec8qbm',
      },
    },
    {
      title: 'Seated Cable Row - Bar Wide Grip',
      equipmentId: 5,
      primaryMuscleId: 20,
      secondaryMuscleIds: [13, 18, 5, 9],
      instruction: [
        'Attach a curved bar to a seated cable row machine.',
        'Select the appropriate weight.',
        'Sit down, place your feet on the platform, and bend your knees slightly.',
        'Lean forward and grab the bar with a double overhand grip (palms facing down).',
        'Lean back to lift the weight from its stack, engage your abs, and retract your shoulder blades.',
        'Take a breath and row the bar to your stomach, squeezing your back and breathing out.',
        'Slowly extend your arms and breathe in.',
      ],
      file: {
        url: 'https://res.cloudinary.com/dzwstma9h/video/upload/v1776225750/exercises/02181201-Cable-Seated-Wide-grip-Row_Back_uneciw.mp4',
        publicId: 'exercises/02181201-Cable-Seated-Wide-grip-Row_Back_uneciw',
      },
    },
    {
      title: 'Bent Over Row (Barbell)',
      equipmentId: 2,
      primaryMuscleId: 20,
      secondaryMuscleIds: [13, 5, 9],
      instruction: [
        'Stand in front of a loaded barbell with your feet in a comfortable stance and toes pointing slightly out.',
        'Lean forward by hinging at the hip and keep your spine in a neutral position.',
        'Grab the barbell with an even overhand grip.',
        'Engage your abs and lift the bar several inches off the floor.',
        'With your shoulders back and midsection tight, take a breath and row the barbell.',
        'Lift the bar until it taps your stomach and hold the position for a moment as you exhale.',
        'Lower the bar slowly.',
      ],
      file: {
        url: 'https://res.cloudinary.com/dzwstma9h/video/upload/v1776226005/exercises/00271201-Barbell-Bent-Over-Row_Back_sjsqkn.mp4',
        publicId: 'exercises/00271201-Barbell-Bent-Over-Row_Back_sjsqkn',
      },
    },
  ],
  equipments: [
    {
      id: 1,
      name: 'All Equipment',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772693553/equipments/all-equipment_taoc85.png',
    },
    {
      id: 2,
      name: 'Barbell',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772693310/equipments/barbell_olehyd.png',
    },
    {
      id: 3,
      name: 'Dumbbell',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772693310/equipments/dumbell_n2ra3r.png',
    },
    {
      id: 4,
      name: 'Kettlebell',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772693310/equipments/kettlebell_od1utr.png',
    },
    {
      id: 5,
      name: 'Machine',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772693310/equipments/machine_eb5aug.png',
    },
    {
      id: 6,
      name: 'Plate',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772693311/equipments/plate_hioyiu.png',
    },
    {
      id: 7,
      name: 'Resistance Band',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772693311/equipments/resistance-band_tagf7h.png',
    },
    {
      id: 8,
      name: 'Suspension Band',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772693311/equipments/suspension-band_wtgib6.png',
    },
    {
      id: 9,
      name: 'None',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772693310/equipments/none_jynbcc.png',
    },
    {
      id: 10,
      name: 'Other',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772693549/equipments/other_jflkow.png',
    },
  ],
  muscles: [
    {
      id: 1,
      name: 'All Muscles',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772616053/muscles/all-muscles_yquqgg.png',
    },
    {
      id: 2,
      name: 'Abdominals',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772610230/muscles/abdominals_rua0rn.webp',
    },
    {
      id: 3,
      name: 'Abductors',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772610231/muscles/abductors_bgghtj.webp',
    },
    {
      id: 4,
      name: 'Adductors',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772610230/muscles/adductors_bgmrp0.webp',
    },
    {
      id: 5,
      name: 'Biceps',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772610220/muscles/biceps_ytlpoo.webp',
    },
    {
      id: 6,
      name: 'Calves',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772610228/muscles/calves_c7v8lu.jpg',
    },
    {
      id: 7,
      name: 'Cardio',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772611569/muscles/cardio_xz4isc.webp',
    },
    {
      id: 8,
      name: 'Chest',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772610227/muscles/chest_dxugnm.webp',
    },
    {
      id: 9,
      name: 'Forearms',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772610227/muscles/forearms_unxw0s.webp',
    },
    {
      id: 10,
      name: 'Full Body',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772610226/muscles/fullbody_hn8m5d.webp',
    },
    {
      id: 11,
      name: 'Glutes',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772610229/muscles/glutes_idig1o.webp',
    },
    {
      id: 12,
      name: 'Hamstrings',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772610228/muscles/hamstrings_rsztvf.webp',
    },
    {
      id: 13,
      name: 'Lats',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772610224/muscles/lats_n8tqqs.webp',
    },
    {
      id: 14,
      name: 'Lower Back',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772610974/muscles/lower-back_ndvetw.webp',
    },
    {
      id: 15,
      name: 'Neck',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772610223/muscles/neck_cefcma.webp',
    },
    {
      id: 16,
      name: 'Quadriceps',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772610222/muscles/quadriceps_bm40uf.webp',
    },
    {
      id: 17,
      name: 'Shoulders',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772610222/muscles/shoulders_smoyv3.webp',
    },
    {
      id: 18,
      name: 'Traps',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772610221/muscles/traps_fdgciw.webp',
    },
    {
      id: 19,
      name: 'Triceps',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772610221/muscles/triceps_oo1g14.webp',
    },
    {
      id: 20,
      name: 'Upper Back',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772610934/muscles/upper-back_uffj3d.webp',
    },
    {
      id: 21,
      name: 'Other',
      imageUrl:
        'https://res.cloudinary.com/dzwstma9h/image/upload/v1772616477/muscles/other_lu3fqg.png',
    },
  ],
};
