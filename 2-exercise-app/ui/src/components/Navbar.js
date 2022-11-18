
const Navbar = () => {
  return (
    <nav className="nav">
      <a className="nav-link-header" href="/">
        <h1 className="nav-header">
          Home
        </h1>
      </a>
      <ul className="nav-ul">
        <li className="nav-li">
        <a href="/exercise">Exercise</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;