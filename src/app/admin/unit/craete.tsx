import { AutocompleteInput, Create, NumberInput, ReferenceInput, required, SimpleForm, TextInput } from 'react-admin'

export default function UnitCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="单元名称名称" />
        <TextInput source="description" validate={[required()]} label="单元描述" />
        <ReferenceInput source="courseId" reference="courses">
          <AutocompleteInput label="关联课程" />
        </ReferenceInput>
        <NumberInput source="order" validate={[required()]} label="排序" />
      </SimpleForm>
    </Create>
  )
}
