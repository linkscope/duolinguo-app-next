import { auth } from '@clerk/nextjs/server'

export const isAdmin = () => {
  const { userId } = auth()

  return userId === 'user_2gW5TH47krXKwCSrZsVeMD83Vxt'
}
