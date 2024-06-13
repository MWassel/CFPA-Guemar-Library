import Link from "next/link";

export default function AdminDashboardCard({ title, link, color }) {
  return (
    <Link
      href={link}
      className={`w-full h-80 flex flex-col flex-grow p-4 justify-center items-center rounded-3xl bg-${color} shadow-md p-4`}
    >
      <div className="text-white font-bold text-3xl">{title}</div>
    </Link>
  );
}
