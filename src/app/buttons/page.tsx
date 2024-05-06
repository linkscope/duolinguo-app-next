import { Button } from '@/components/ui/button'

export default function ButtonsPage() {
  return (
    <div className="flex max-w-[200px] flex-col space-y-4 p-4">
      <Button>默认</Button>
      <Button variant="primary">主级</Button>
      <Button variant="primaryOutline">无边框主级</Button>
      <Button variant="secondary">次级</Button>
      <Button variant="secondaryOutline">无边框次级</Button>
      <Button variant="danger">危险</Button>
      <Button variant="dangerOutline">无边框危险</Button>
      <Button variant="super">超级</Button>
      <Button variant="superOutline">无边框超级</Button>
      <Button variant="ghost">幽灵</Button>
      <Button variant="sidebar">侧栏</Button>
      <Button variant="sidebarOutline">侧栏无边框</Button>
    </div>
  )
}
