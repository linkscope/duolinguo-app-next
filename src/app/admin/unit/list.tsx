import { Datagrid, List, NumberField, ReferenceField, TextField } from 'react-admin'

export default function UnitList() {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" label="ID" />
        <TextField source="title" label="单元名称" />
        <TextField source="description" label="单元描述" />
        <ReferenceField source="courseId" reference="courses" label="关联课程" />
        <NumberField source="order" label="排序" />
      </Datagrid>
    </List>
  )
}
