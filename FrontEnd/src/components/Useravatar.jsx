
const ROLE_STYLE = {
  donor: { avatar: "bg-red-50 text-red-700" },
  hospital: { avatar: "bg-blue-50 text-blue-700" },
  admin: { avatar: "bg-amber-50 text-amber-700" },
};

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function UserAvatar({ image, name, role }) {
  const { avatar } = ROLE_STYLE[role] ?? ROLE_STYLE.donor;

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
      />
    );
  }

  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${avatar}`}
    >
      {getInitials(name)}
    </div>
  );
}
