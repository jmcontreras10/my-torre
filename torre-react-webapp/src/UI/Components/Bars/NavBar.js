import {
  useScreenContext,
  useLoadingContext,
} from "../../../Modules/Screen/ScreenProvider";

import { useUserHandlerContext } from "../../../Modules/User/UserProvider";

const NavBar = () => {
  const { setScreen } = useScreenContext();
  const { logout } = useUserHandlerContext();
  const { setGlobalLoading } = useLoadingContext();

  const logOut = async () => {
    try {
      setGlobalLoading(true);
      await logout();
      setScreen(0);
      setGlobalLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="fixed bg-secondary shadow-md  z-50 w-full px-5 py-2 flex justify-between items-center">
      <div className="flex flex-row justify-items-auto align-middle">
        <p className="justify-self-start align-middle items-center">Torre</p>
        <button className="justify-self-end bg-primary ml-3 p-2 rounded-lg" onClick={logOut}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default NavBar;
