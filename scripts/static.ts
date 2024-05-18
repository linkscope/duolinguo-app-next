import type * as schema from '../db/schema'

export const courses: (typeof schema.courses.$inferSelect)[] = [
  {
    id: 1,
    title: '西班牙语',
    imageSrc: '/ES.svg',
  },
  {
    id: 2,
    title: '法语',
    imageSrc: '/FR.svg',
  },
  {
    id: 3,
    title: '意大利语',
    imageSrc: '/IT.svg',
  },
  {
    id: 4,
    title: '日语',
    imageSrc: '/JP.svg',
  },
  {
    id: 5,
    title: '英语',
    imageSrc: '/US.svg',
  },
]

export const units: (typeof schema.units.$inferSelect)[] = [
  {
    id: 1,
    courseId: 5,
    title: '第一阶段，第1部分',
    description: '连词成句',
    order: 1,
  },
  {
    id: 2,
    courseId: 5,
    title: '第一阶段，第2部分',
    description: '介绍简单的物品和颜色',
    order: 2,
  },
]

export const lessons: (typeof schema.lessons.$inferSelect)[] = [
  {
    id: 1,
    unitId: 1,
    order: 1,
    title: '连词成句',
  },
  {
    id: 2,
    unitId: 1,
    order: 2,
    title: '第2/5单元',
  },
  {
    id: 3,
    unitId: 1,
    order: 3,
    title: '第3/5单元',
  },
  {
    id: 4,
    unitId: 1,
    order: 4,
    title: '第4/5单元',
  },
  {
    id: 5,
    unitId: 1,
    order: 5,
    title: '第一部分总复习',
  },
  {
    id: 6,
    unitId: 2,
    order: 1,
    title: '第1/4单元',
  },
  {
    id: 7,
    unitId: 2,
    order: 2,
    title: '第2/4单元',
  },
  {
    id: 8,
    unitId: 2,
    order: 3,
    title: '第3/4单元',
  },
  {
    id: 9,
    unitId: 2,
    order: 4,
    title: '第二部分总复习',
  },
]

export const challenges: (typeof schema.challenges.$inferSelect)[] = [
  {
    id: 1,
    lessonId: 1,
    type: 'SELECT',
    order: 1,
    question: '哪个是“老师”呢？',
  },
  {
    id: 2,
    lessonId: 1,
    type: 'ASSIST',
    order: 2,
    question: '你的',
  },
  {
    id: 3,
    lessonId: 2,
    type: 'SELECT',
    order: 1,
    question: '哪个是"狗"呢？',
  },
]

export const challengesOptions: (typeof schema.challengeOptions.$inferSelect)[] = [
  {
    id: 1,
    challengeId: 1,
    text: 'teacher',
    correct: true,
    imageSrc: '/teacher.svg',
    audioSrc: 'http://englishprofile.org/evp/audio/TEACHER.mp3',
  },
  {
    id: 2,
    challengeId: 1,
    text: 'student',
    correct: false,
    imageSrc: '/student.svg',
    audioSrc: 'http://englishprofile.org/evp/audio/STUDENT.mp3',
  },
  {
    id: 3,
    challengeId: 1,
    text: 'book',
    correct: false,
    imageSrc: '/book.svg',
    audioSrc: 'http://englishprofile.org/evp/audio/BOOK.mp3',
  },
  {
    id: 4,
    challengeId: 2,
    text: 'your',
    correct: true,
    imageSrc: '',
    audioSrc: 'http://englishprofile.org/evp/audio/YOUR.mp3',
  },
  {
    id: 5,
    challengeId: 2,
    text: 'like',
    correct: false,
    imageSrc: '',
    audioSrc: 'http://englishprofile.org/evp/audio/LIKE.mp3',
  },
  {
    id: 6,
    challengeId: 2,
    text: 'book',
    correct: false,
    imageSrc: '',
    audioSrc: 'http://englishprofile.org/evp/audio/BOOK.mp3',
  },
  {
    id: 7,
    challengeId: 3,
    text: 'mother',
    correct: false,
    imageSrc: '/mother.svg',
    audioSrc: 'http://englishprofile.org/evp/audio/MOTHER.mp3',
  },
  {
    id: 8,
    challengeId: 3,
    text: 'dog',
    correct: true,
    imageSrc: '/dog.svg',
    audioSrc: 'http://englishprofile.org/evp/audio/DOG.mp3',
  },
  {
    id: 9,
    challengeId: 3,
    text: 'cat',
    correct: false,
    imageSrc: '/cat.svg',
    audioSrc: 'http://englishprofile.org/evp/audio/CAT.mp3',
  },
]
