import SearchBar from "@/components/shared/SearchBar";
import { CardShow } from "@/components/shared/CardShow";
import { getUsers } from "../../_action/admin/getUsers";
import { UsersList } from "../../_components/admin/usersList";
import { Paginations } from "@/components/shared/Pagination";


const AdminDashboardPage = async ({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const search = await searchParams
  const users = await getUsers(search)

  return (
    <div className='max-w-7xl mx-auto px-2 py-4'>
      <div className='flxe flex-col space-y-6'>
        <div className='flex flex-col sm:flex-row justify-between space-y-2'>
          <p className='text-xl md:text-2xl whitespace-nowrap font-semibold'>Users Management ({users?.meta?.total ?? ''})</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <p className="whitespace-nowrap">Per Page: </p>
              <CardShow />
            </div>
            <SearchBar />
          </div>
        </div>
        <UsersList users={users?.data} meta={users?.meta} />
        <Paginations meta={users?.meta} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;