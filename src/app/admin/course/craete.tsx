import { Create, required, SimpleForm, TextInput } from 'react-admin'

export default function CourseCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="课程名称" />
        <TextInput source="imageSrc" validate={[required()]} label="图片路径" />
      </SimpleForm>
    </Create>
  )
}
