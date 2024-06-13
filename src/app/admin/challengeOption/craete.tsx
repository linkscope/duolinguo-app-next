import { AutocompleteInput, BooleanInput, Create, ReferenceInput, required, SimpleForm, TextInput } from 'react-admin'

export default function ChallengeOptionCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="text" validate={[required()]} label="问题文本" />
        <BooleanInput source="correct" label="是否为正确答案" />
        <ReferenceInput source="challengeId" reference="challenges">
          <AutocompleteInput label="关联挑战" />
        </ReferenceInput>
        <TextInput source="imageSrc" label="图片路径" />
        <TextInput source="audioSrc" label="语音路径" />
      </SimpleForm>
    </Create>
  )
}
