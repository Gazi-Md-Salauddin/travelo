import { getUsers } from "@/lib/actions/users";
import UserRow from "@/components/UserRow";

const ManageUsersPage =
  async () => {
    const users =
      await getUsers();

    return (
      <section>
        <h1 className="mb-6 text-3xl font-bold">
          Manage Users
        </h1>

        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full">
            <thead className="bg-default-100">
              <tr>
                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map(
                (user) => (
                  <UserRow
                    key={user._id}
                    user={user}
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

export default ManageUsersPage;