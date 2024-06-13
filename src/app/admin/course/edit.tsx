import { Edit, required, SimpleForm, TextInput } from 'react-admin'

export default function CourseEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} label="ID" />
        <TextInput source="title" validate={[required()]} label="课程名称" />
        <TextInput source="imageSrc" validate={[required()]} label="图片路径" />
      </SimpleForm>
    </Edit>
  )
}
