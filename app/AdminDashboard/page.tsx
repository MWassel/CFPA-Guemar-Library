"use client";
import AddAuthorComp from "../Components/addAuthorComp";
import AddBookComp from "../Components/addBookComp";
import ManualBookLandingComp from "../Components/manualBookLandingComp";
import AddBookCopyComp from "../Components/addBookCopyComp";
import AdminDashboardCard from "../Components/adminDashboardCard";

export default function AdminDashboard() {
  return (
    <>
      <div className=" container mx-auto border-2 border-pink-600">
        <div className=" grid grid-cols-3 sm:grid-cols-3 m-10 gap-8 mt-28">
          <div className="flex flex-col col-span-2 w-full gap-8 border-2 border-green-500">
            <AdminDashboardCard
              title="books gallery"
              link="/BookGallery"
              color="darkBlueCard"
            ></AdminDashboardCard>
            <AdminDashboardCard
              title="لوحة التحكم"
              link="/ControlPanel"
              color="orangeCard"
            ></AdminDashboardCard>
          </div>
          <div className="flex flex-col col-span-1 w-full gap-8 border-2 border-yellow-400">
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
