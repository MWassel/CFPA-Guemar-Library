import AdminDashboardCard from "../Components/adminDashboardCard";

export default function UserDashboard() {
  return (
    <>
      <div className=" container mx-auto">
        <div className=" grid grid-cols-3 sm:grid-cols-3 m-10 gap-8 mt-28">
          <div className="flex flex-col col-span-2 w-full gap-8">
            <AdminDashboardCard
              title="معرض الكتب"
              link="/BookGallery"
              color="darkBlueCard"
            ></AdminDashboardCard>
            <AdminDashboardCard
              title="إستعر كتابا"
              link="/LandABook"
              color="lightBlueCard"
            ></AdminDashboardCard>
          </div>
          <div className="flex flex-col col-span-1 w-full gap-8">
            <AdminDashboardCard
              title="كتبي"
              link="/MyBooks"
              color="lightBlueCard"
            ></AdminDashboardCard>
            <AdminDashboardCard
              title="حسابي"
              link="/MyAccount"
              color="darkBlueCard"
            ></AdminDashboardCard>
          </div>
        </div>
      </div>
    </>
  );
}
