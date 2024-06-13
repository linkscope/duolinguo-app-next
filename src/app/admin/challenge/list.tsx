import { Datagrid, List, NumberField, ReferenceField, SelectField, TextField } from 'react-admin'

export default function ChallengeList() {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" label="ID" />
        <TextField source="question" label="挑战问题" />
        <SelectField
          source="type"
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
        <ReferenceField source="lessonId" reference="lessons" label="关联课程" />
        <NumberField source="order" label="排序" />
      </Datagrid>
    </List>
  )
}
