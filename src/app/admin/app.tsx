'use client'

import { Admin, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'
import CourseList from '@/app/admin/course/list'
import CourseCreate from '@/app/admin/course/craete'
import CourseEdit from '@/app/admin/course/edit'
import UnitList from '@/app/admin/unit/list'
import UnitCreate from '@/app/admin/unit/craete'
import UnitEdit from '@/app/admin/unit/edit'
import LessonList from '@/app/admin/lesson/list'
import LessonCreate from '@/app/admin/lesson/craete'
import LessonEdit from '@/app/admin/lesson/edit'
import ChallengeList from '@/app/admin/challenge/list'
import ChallengeCreate from '@/app/admin/challenge/craete'
import ChallengeEdit from '@/app/admin/challenge/edit'

export default function AdminApp() {
  return (
    <Admin dataProvider={simpleRestProvider('/api')}>
      <Resource
        name="courses"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
        recordRepresentation="title"
        options={{ label: '课程管理' }}
      />
      <Resource
        name="units"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
        recordRepresentation="title"
        options={{ label: '单元管理' }}
      />
      <Resource
        name="lessons"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
        recordRepresentation="title"
        options={{ label: '课程管理' }}
      />
      <Resource
        name="challenges"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
        recordRepresentation="title"
        options={{ label: '问题管理' }}
      />
    </Admin>
  )
}
