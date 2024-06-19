import AdminDashboardCard from "../Components/adminDashboardCard";

export default function BookManagement() {
  return (
    <>
      <div className="container mx-auto">
        <div className=" grid grid-cols-2 sm:grid-cols-2 mt-64 self-center gap-8 h-full justify-center items-center">
          <AdminDashboardCard
            title="إضافة"
            link="/AddData"
            color="orangeCard"
          />
          <AdminDashboardCard
            title="تعديل/حذف"
            link="/ModifyData"
            color="darkBlueCard"
          />
        </div>
      </div>
    </>
  );
}
