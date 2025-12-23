"use client"

import Link from "next/link"
import posthog from "posthog-js"

const Users = () => {
  const handleUserClick = (userId: string) => {
    posthog.capture('user_link_clicked', {
      user_id: userId,
      source: 'dashboard_users_list',
    })
  }

  return (
    <>

      <h1> Dashboard Users </h1>

      <ul>
        <li><Link href="/dashboard/users/1" onClick={() => handleUserClick('1')}>User 1</Link></li>
        <li><Link href="/dashboard/users/2" onClick={() => handleUserClick('2')}>User 2</Link></li>
        <li><Link href="/dashboard/users/3" onClick={() => handleUserClick('3')}>User 3</Link></li>
      </ul>


    </>

  )
}

export default Users