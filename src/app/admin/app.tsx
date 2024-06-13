'use client'

import { Admin, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'
import CourseList from '@/app/admin/course/list'
import CourseCreate from '@/app/admin/course/craete'
import CourseEdit from '@/app/admin/course/edit'
import UnitList from '@/app/admin/unit/list'
import UnitCreate from '@/app/admin/unit/craete'
import UnitEdit from '@/app/admin/unit/edit'

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
    </Admin>
  )
}
