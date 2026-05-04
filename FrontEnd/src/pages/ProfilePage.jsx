import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthUser } from "../Hooks/useAuthUser";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTint,
  FaWeight,
  FaRulerVertical,
  FaVenusMars,
  FaCalendarAlt,
  FaNotesMedical,
  FaEdit,
  FaHospital,
  FaIdCard,
  FaShieldAlt,
} from "react-icons/fa";

// ── Field definitions per role ────────────────────────────────────────────────
const DONOR_FIELDS = [
  { key: "name", label: "Full name", icon: <FaUser />, section: "Personal" },
  { key: "email", label: "Email", icon: <FaEnvelope />, section: "Personal" },
  { key: "phone", label: "Phone", icon: <FaPhone />, section: "Personal" },
  {
    key: "address",
    label: "Address",
    icon: <FaMapMarkerAlt />,
    section: "Personal",
  },
  { key: "gender", label: "Gender", icon: <FaVenusMars />, section: "Medical" },
  {
    key: "bloodType",
    label: "Blood type",
    icon: <FaTint />,
    section: "Medical",
  },
  { key: "age", label: "Age", icon: <FaCalendarAlt />, section: "Medical" },
  {
    key: "weight",
    label: "Weight (kg)",
    icon: <FaWeight />,
    section: "Medical",
  },
  {
    key: "height",
    label: "Height (cm)",
    icon: <FaRulerVertical />,
    section: "Medical",
  },
  {
    key: "diseases",
    label: "Health notes",
    icon: <FaNotesMedical />,
    section: "Medical",
  },
  {
    key: "lastDonation",
    label: "Last donation",
    icon: <FaCalendarAlt />,
    section: "Medical",
  },
];

const HOSPITAL_FIELDS = [
  {
    key: "name",
    label: "Hospital name",
    icon: <FaHospital />,
    section: "Info",
  },
  { key: "email", label: "Email", icon: <FaEnvelope />, section: "Info" },
  { key: "phone", label: "Phone", icon: <FaPhone />, section: "Info" },
  {
    key: "address",
    label: "Address",
    icon: <FaMapMarkerAlt />,
    section: "Info",
  },
  {
    key: "licenseNumber",
    label: "License no.",
    icon: <FaIdCard />,
    section: "Info",
  },
];

const ADMIN_FIELDS = [
  { key: "name", label: "Full name", icon: <FaUser />, section: "Account" },
  { key: "email", label: "Email", icon: <FaEnvelope />, section: "Account" },
  { key: "role", label: "Role", icon: <FaShieldAlt />, section: "Account" },
];

const FIELDS_BY_ROLE = {
  donor: DONOR_FIELDS,
  hospital: HOSPITAL_FIELDS,
  admin: ADMIN_FIELDS,
};

const EDIT_PATH_BY_ROLE = {
  donor: "/donor/profile/edit",
  hospital: "/hospital/profile/edit",
  admin: "/admin/profile/edit",
};

const AVATAR_COLORS = {
  donor: { bg: "bg-red-100", text: "text-red-600" },
  hospital: { bg: "bg-blue-100", text: "text-blue-600" },
  admin: { bg: "bg-amber-100", text: "text-amber-600" },
};

const ROLE_LABEL = { donor: "Donor", hospital: "Hospital", admin: "Admin" };

// ── Component ─────────────────────────────────────────────────────────────────
export default function Profile() {
  const { data: user } = useAuthUser();
  const [imgError, setImgError] = useState(false);

  if (!user) 
    return(
   <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin h-10 w-10 border-b-2 border-red-600 rounded-full" />
    </div>
    )
   

  const role = user.role ?? "donor";
  const fields = FIELDS_BY_ROLE[role] ?? DONOR_FIELDS;
  const avatarColor = AVATAR_COLORS[role] ?? AVATAR_COLORS.donor;

  // group fields by section
  const sections = fields.reduce((acc, f) => {
    if (!acc[f.section]) acc[f.section] = [];
    acc[f.section].push(f);
    return acc;
  }, {});

  const initials = (user.name ?? "?")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
console.log("User Data from API:", user);
  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      {/* <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
        <Link
          to={editPath}
          className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
        >
          <FaEdit className="text-xs" /> Edit profile
        </Link>
      </div>}
     

      {/* ── Avatar card ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-5">
        {user.image && !imgError ? (
          <img
            src={user.image}
            alt={user.name}
            onError={() => setImgError(true)}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 flex-shrink-0"
          />
        ) : (
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0 ${avatarColor.bg} ${avatarColor.text}`}
          >
            {initials}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-400">{user.email}</p>
          <span
            className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-medium ${avatarColor.bg} ${avatarColor.text}`}
          >
            {ROLE_LABEL[role] ?? role}
          </span>
        </div>
      </div>

      {/* ── Field sections ── */}
      {Object.entries(sections).map(([section, sFields]) => (
        <div
          key={section}
          className="bg-white rounded-2xl border border-gray-100 p-5"
        >
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            {section}
          </p>
          <dl className="divide-y divide-gray-50">
            {sFields.map(({ key, label, icon }) => {
              const val = user[key];
              return (
                <div key={key} className="flex items-center gap-4 py-3">
                  <span className="text-gray-300 text-base w-5 flex-shrink-0">
                    {icon}
                  </span>
                  <dt className="text-sm text-gray-400 w-32 flex-shrink-0">
                    {label}
                  </dt>
                  <dd className="text-sm text-gray-800 font-medium">
                    {val != null && val !== "" ? (
                      String(val)
                    ) : (
                      <span className="text-gray-300 font-normal">Not set</span>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      ))}
    </div>
  );
}
