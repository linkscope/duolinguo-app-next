import {
  AutocompleteInput,
  Edit,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin'

export default function ChallengeEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} label="ID" />
        <TextInput source="question" validate={[required()]} label="挑战问题" />
        <SelectInput
          source="type"
          validate={[required()]}
          choices={[
            {
              id: 'SELECT',
              name: '选择图片',
            },
            {
              id: 'ASSIST',
              name: '选择含义',
            },
          ]}
          label="问题类型"
        />
        <ReferenceInput source="lessonId" reference="lessons">
          <AutocompleteInput label="关联课程" />
        </ReferenceInput>
        <NumberInput source="order" validate={[required()]} label="排序" />
      </SimpleForm>
    </Edit>
  )
}
