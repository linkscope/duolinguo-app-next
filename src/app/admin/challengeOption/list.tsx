import { BooleanField, Datagrid, List, ReferenceField, TextField } from 'react-admin'

export default function ChallengeOptionList() {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" label="ID" />
        <TextField source="text" label="问题文本" />
        <BooleanField source="correct" label="是否为正确答案" />
        <ReferenceField source="challengeId" reference="challenges" label="关联挑战" />
        <TextField source="imageSrc" label="图片路径" />
        <TextField source="audioSrc" label="语音路径" />
      </Datagrid>
    </List>
  )
}
