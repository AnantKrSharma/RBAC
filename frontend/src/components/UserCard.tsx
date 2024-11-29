
interface UserCardProps{
    id: string
    name: string,
    email: string,
    role: string,
    deleteButton?: boolean,
    deleteUser?: (id: string) => void
}

function UserCard({ id, name, email, role, deleteButton = false, deleteUser } : UserCardProps) {
    return (
        <div className="flex flex-col justify-center items-center gap-2 border p-3 m-4 rounded-lg bg-gray-600">
            <div>
                <div>
                    Id - {id}
                </div>
                <div>
                    Name - {name}
                </div>
                <div>
                    Email - {email}
                </div>
                <div>
                    Role - {role}
                </div>
            </div>

            {deleteButton && deleteUser && 
            <button className="text-white p-2 bg-red-950 rounded-lg"
                    onClick={() => {deleteUser(id)}}
            >
                Delete {role}
            </button>
            }
        </div>
    )
}

export default UserCard
