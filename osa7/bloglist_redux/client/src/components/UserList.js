import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector(state => state.users)

  const sortBlogsToUsers = () => {
    return users.map(user =>
      <tr key={user.id}>
        <td className='user-list'><Link to={`/users/${user.id}`}>{user.name}</Link></td>
        <td className='user-list'>{user.blogs.length}</td>
      </tr>
    )
  }
  return (
    <div className="wrap">
      <h2>Users     </h2>
      <table>
        <thead>
          <tr>
            <th className='user-list'>Name</th>
            <th className='user-list'>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {sortBlogsToUsers()}
        </tbody>
      </table>
    </div>
  )
}

export default UserList