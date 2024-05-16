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
    courseId: 1,
    title: '第一阶段',
    description: '学习西班牙语基础',
    order: 1,
  },
]

export const lessons: (typeof schema.lessons.$inferSelect)[] = [
  {
    id: 1,
    unitId: 1,
    order: 1,
    title: '名词',
  },
]

export const challenges: (typeof schema.challenges.$inferSelect)[] = [
  {
    id: 1,
    lessonId: 1,
    type: 'SELECT',
    order: 1,
    question: '哪个是“男人”呢？',
  },
]

export const challengesOptions: (typeof schema.challengeOptions.$inferSelect)[] = [
  {
    id: 1,
    challengeId: 1,
    text: 'el homre',
    correct: true,
    imageSrc: '/man.svg',
    audioSrc: '/es_man.mp3',
  },
  {
    id: 2,
    challengeId: 1,
    text: 'la mujer',
    correct: false,
    imageSrc: '/woman.svg',
    audioSrc: '/es_woman.mp3',
  },
  {
    id: 3,
    challengeId: 1,
    text: 'el robot',
    correct: false,
    imageSrc: '/robot.svg',
    audioSrc: '/es_robot.mp3',
  },
]
