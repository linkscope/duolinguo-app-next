import { AutocompleteInput, Create, NumberInput, ReferenceInput, required, SimpleForm, TextInput } from 'react-admin'

export default function LessonCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="课程名称" />
        <ReferenceInput source="unitId" reference="units">
          <AutocompleteInput label="关联单元" />
        </ReferenceInput>
        <NumberInput source="order" validate={[required()]} label="排序" />
      </SimpleForm>
    </Create>
  )
}
