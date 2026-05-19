import React from 'react'
import AvatarComponent from './components/AvatarComponent'
import { useAuthStore } from '../../zustand/authStore'
import BasicDetailsUpdate from './components/BasicDetailsUpdate'
import AccountType from './components/AccountType'
import AddressCard from './components/AddressCard'

const ProfilePage = () => {

  const user = useAuthStore((s) => s.user)

  return (

    <div className='w-full max-w-5xl mx-auto py-10'>

      {/* Heading */}

      <div className='mb-10'>

        <h1 className='text-4xl font-bold text-black'>
          My Profile
        </h1>

        <p className='text-zinc-500 mt-2'>
          Manage your personal information and account settings.
        </p>

      </div>

      {/* Avatar */}

      <div className='mb-10'>
        <AvatarComponent userName={user.name} />
      </div>

      {/* Content */}

      <div className='flex flex-col gap-y-6'>

        <BasicDetailsUpdate />

        <AccountType />

        <AddressCard />

      </div>

    </div>

  )

}

export default ProfilePage