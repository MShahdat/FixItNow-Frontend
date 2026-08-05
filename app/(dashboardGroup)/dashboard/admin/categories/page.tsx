import SearchBar from "@/components/shared/SearchBar";
import { Paginations } from "@/components/shared/Pagination";
import { AllCategoryList } from "../../_components/admin/categoryList";
import { CategoryForm } from "../../_components/admin/categoryForm";
import { getAllCategories } from "../../_action/admin/getAllCategories";


const CategoryPage = async ({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const search = await searchParams
  const categories = await getAllCategories(search)


  return (
    <div className='max-w-5xl px-2 py-4'>
      <div className='flxe flex-col space-y-4'>
        <div className='flex flex-col sm:flex-row justify-between space-y-2'>
          <p className='text-xl md:text-2xl whitespace-nowrap font-semibold'>Category Management ({categories?.meta?.total ?? ''})</p>
          {/* <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <p className="whitespace-nowrap">Per Page: </p>
              <CardShow />
            </div>
            <SearchBar />
          </div> */}
          <div className="flex items-center gap-2">
            <SearchBar />
            <CategoryForm mode={"create"} />
          </div>
        </div>
        <AllCategoryList categories={categories?.data} meta={categories?.meta} />
        <Paginations meta={categories?.meta} />
      </div>
    </div>
  );
};

export default CategoryPage;