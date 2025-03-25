import authStore from "../store/authStore";

const NavBar = () => {
  const { user } = authStore();
  return (
    <div className="w-full h-12 bg-lightGray shadow-md px-12 py-2">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">Todo</span>
        <span className="text-lg font-semibold hover:cursor-pointer hover:opacity-70">
          {user?.username}
        </span>
      </div>
    </div>
  );
};

export default NavBar;
