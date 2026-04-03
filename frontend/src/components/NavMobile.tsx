export default function NavMobile() {
  return (
    <>
      <nav className="nav-mobile-main md:hidden bottom-0 bg-zinc-900 flex justify-center text-center p-2 mt-3">
        <p className="mr-4">
          <i className="fa-solid fa-house-chimney text-xl"></i>
          <span className="block">Main page</span>
        </p>
        <p className="mr-4">
          <i className="fa-solid fa-cube text-xl"></i>
          <span className="block">Projects</span>
        </p>
        <p className="mr-4">
          <i className="fa-solid fa-clipboard-list text-xl"></i>
          <span className="block">Boards</span>
        </p>
      </nav>
      <nav className="opacity-0 disabled  flex justify-center text-center p-3 mt-3">
        <p>
          <i className="fa-solid fa-house-chimney"></i>
          <span className="block">Main page</span>
        </p>
        <p>
          <i className="fa-solid fa-cube"></i>
          <span className="block">Projects</span>
        </p>
        <p>
          <i className="fa-solid fa-clipboard-list"></i>
          <span className="block">Boards</span>
        </p>
      </nav>
    </>
  );
}
