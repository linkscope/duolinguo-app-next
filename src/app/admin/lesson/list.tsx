import { Datagrid, List, NumberField, ReferenceField, TextField } from 'react-admin'

export default function LessonList() {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" label="ID" />
        <TextField source="title" label="课程名称" />
        <ReferenceField source="unitId" reference="units" />
        <NumberField source="order" label="排序" />
      </Datagrid>
    </List>
  )
}
