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
      primaryMuscleId: 7,
      secondaryMuscleIds: [8, 16],
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
        url: 'https://res.cloudinary.com/dzwstma9h/video/upload/v1774605668/exercises/00251201-Barbell-Bench-Press_Chest_iqoapc.mp4',
        publicId: 'exercises/00251201-Barbell-Bench-Press_Chest_iqoapc',
      },
    },
    {
      title: 'Hack Squat (Machine)',
      equipmentId: 5,
      primaryMuscleId: 15,
      secondaryMuscleIds: [],
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
        url: 'https://res.cloudinary.com/dzwstma9h/video/upload/v1774605667/exercises/07431201-Sled-Hack-Squat_Hips_hgsvlg.mp4',
        publicId: 'exercises/07431201-Sled-Hack-Squat_Hips_hgsvlg',
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
