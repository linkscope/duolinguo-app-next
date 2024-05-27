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
    courseId: 4,
    title: '第1阶段，第1部分',
    description: '使用简单的数字和颜色',
    order: 1,
  },
  {
    id: 2,
    courseId: 4,
    title: '第一阶段，第2部分',
    description: '认识简单的动词和形容词',
    order: 2,
  },
]

export const lessons: (typeof schema.lessons.$inferSelect)[] = [
  {
    id: 1,
    unitId: 1,
    order: 1,
    title: '第一单元',
  },
  {
    id: 2,
    unitId: 1,
    order: 2,
    title: '第二单元',
  },
  {
    id: 3,
    unitId: 1,
    order: 3,
    title: '第3单元',
  },
  {
    id: 4,
    unitId: 1,
    order: 4,
    title: '第1部分总复习',
  },
  {
    id: 5,
    unitId: 2,
    order: 1,
    title: '第1单元',
  },
  {
    id: 6,
    unitId: 2,
    order: 2,
    title: '第2单元',
  },
  {
    id: 7,
    unitId: 2,
    order: 3,
    title: '第3单元',
  },
  {
    id: 8,
    unitId: 2,
    order: 4,
    title: '第2部分总复习',
  },
]

export const challenges: (typeof schema.challenges.$inferSelect)[] = [
  {
    id: 1,
    lessonId: 1,
    type: 'SELECT',
    order: 1,
    question: '哪个是“二”呢？',
  },
  {
    id: 2,
    lessonId: 1,
    type: 'SELECT',
    order: 2,
    question: '哪个是“七”呢？',
  },
  {
    id: 3,
    lessonId: 1,
    type: 'ASSIST',
    order: 3,
    question: '早',
  },
  {
    id: 4,
    lessonId: 1,
    type: 'SELECT',
    order: 4,
    question: '哪个是“白”呢？',
  },
]

export const challengesOptions: (typeof schema.challengeOptions.$inferSelect)[] = [
  {
    id: 1,
    challengeId: 1,
    text: 'さん',
    correct: false,
    imageSrc: '/jp_three.svg',
    audioSrc: '/jp_three.mp3',
  },
  {
    id: 2,
    challengeId: 1,
    text: 'に',
    correct: true,
    imageSrc: '/jp_two.svg',
    audioSrc: '/jp_two.mp3',
  },
  {
    id: 3,
    challengeId: 1,
    text: 'いち',
    correct: false,
    imageSrc: '/jp_one.svg',
    audioSrc: '/jp_one.mp3',
  },
  {
    id: 4,
    challengeId: 2,
    text: 'さん',
    correct: false,
    imageSrc: '/jp_three.svg',
    audioSrc: '/jp_three.mp3',
  },
  {
    id: 5,
    challengeId: 2,
    text: 'ろく',
    correct: false,
    imageSrc: '/jp_six.svg',
    audioSrc: '/jp_six.mp3',
  },
  {
    id: 6,
    challengeId: 2,
    text: 'なな',
    correct: true,
    imageSrc: '/jp_seven.svg',
    audioSrc: '/jp_seven.mp3',
  },
  {
    id: 7,
    challengeId: 3,
    text: 'いち',
    correct: false,
    imageSrc: '',
    audioSrc: '/jp_one.mp3',
  },
  {
    id: 8,
    challengeId: 3,
    text: 'さん',
    correct: false,
    imageSrc: '',
    audioSrc: '/jp_three.mp3',
  },
  {
    id: 9,
    challengeId: 3,
    text: 'おはよう',
    correct: true,
    imageSrc: '',
    audioSrc: '/jp_morning.mp3',
  },
  {
    id: 10,
    challengeId: 4,
    text: 'あお',
    correct: false,
    imageSrc: '/jp_blue.svg',
    audioSrc: '/jp_blue.mp3',
  },
  {
    id: 11,
    challengeId: 4,
    text: 'あか',
    correct: false,
    imageSrc: '/jp_red.svg',
    audioSrc: '/jp_red.mp3',
  },
  {
    id: 12,
    challengeId: 4,
    text: 'しろ',
    correct: true,
    imageSrc: '/jp_white.svg',
    audioSrc: '/jp_white.mp3',
  },
]
