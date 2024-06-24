import AdminDashboardCard from "../Components/adminDashboardCard";

export default function AdminDashboard() {
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
              title="إدارة المستخدمين"
              link="/ControlPanel"
              color="orangeCard"
            ></AdminDashboardCard>
          </div>
          <div className="flex flex-col col-span-1 w-full gap-8">
            <AdminDashboardCard
              title="إدارة الكتب"
              link="/BookManagement"
              color="orangeCard"
            ></AdminDashboardCard>
            <AdminDashboardCard
              title="إعارة الكتب"
              link="/BookLanding"
              color="darkBlueCard"
            ></AdminDashboardCard>
          </div>
        </div>
      </div>
    </>
  );
}
