import { AutocompleteInput, Edit, NumberInput, ReferenceInput, required, SimpleForm, TextInput } from 'react-admin'

export default function LessonEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} label="ID" />
        <TextInput source="title" validate={[required()]} label="课程名称" />
        <ReferenceInput source="unitId" reference="units">
          <AutocompleteInput label="关联单元" />
        </ReferenceInput>
        <NumberInput source="order" validate={[required()]} label="排序" />
      </SimpleForm>
    </Edit>
  )
}
