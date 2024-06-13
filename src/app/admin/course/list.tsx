import { Datagrid, List, TextField } from 'react-admin'

export default function CourseList() {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" label="ID" />
        <TextField source="title" label="课程名称" />
        <TextField source="imageSrc" label="图片路径" />
      </Datagrid>
    </List>
  )
}
