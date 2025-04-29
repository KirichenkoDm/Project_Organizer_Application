import { useUserStore } from '@/store/root-provider'
import { Avatar } from 'radix-ui'
import React, { FC } from 'react'

const HomeHeader: FC = () => {
  const userStore = useUserStore();

  const displayName = userStore.user!.firstName + " " + userStore.user!.lastName;
  const avatarFallback = userStore.user!.firstName[0] + userStore.user!.lastName[0];

  return (
    <header>
      <h1>Project Organizer APP</h1>
      <div>
        <span>{displayName}</span>
        <Avatar.Root>
          <Avatar.Fallback>
            {avatarFallback}
          </Avatar.Fallback>
        </Avatar.Root>
      </div>
    </header>
  )
}

export default HomeHeader