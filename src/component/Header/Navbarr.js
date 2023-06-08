import { Link } from "react-router-dom";
import "../../App.css";

import { Button, Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import EmailVerify from "../Authantication/EmailVerify";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../Store/Expensereducer";
import { authActions } from "../Store/Authreducer";

const Navbarr = () => {
  const auth = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const isdarkMode = useSelector((state) => state.expenses.isdarkMode);
  const isPremium = useSelector((state) => state.expenses.showPrime);

  const isActive = useSelector((state) => state.expenses.isActive);
  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");

    localStorage.removeItem("userId");
  };

  const handleDarkMode = () => {
    dispatch(expenseActions.setMode());
  };
  const activatePremiumHandler = () => {
    dispatch(expenseActions.activatePremium());
  };

  return isActive ? (
    <Navbar className={isdarkMode ? "dark-theme" : ""} expand="md">
      <Container fluid>
        <NavbarBrand className={isdarkMode && "font-theme"}>
          Welcome to Expense Tracker!!!!
          {isPremium && <h3>Premium User</h3>}
        </NavbarBrand>
        <Nav style={{ fontVariant: "light" }}>
          {!isdarkMode && (
            <Button
              size="sm"
              className="py-0 btn btn-success"
              style={{ marginRight: "0.5rem" }}
              onClick={handleDarkMode}
            >
              dark Mode
            </Button>
          )}
          {isdarkMode && (
            <Button
              size="sm"
              className="py-0 btn btn-success"
              style={{ marginRight: "0.5rem" }}
              onClick={handleDarkMode}
            >
              light Mode
            </Button>
          )}
          {auth && <EmailVerify />}

          {auth && (
            <span className={"para"} style={{ marginRight: "0.5rem" }}>
              Update your profile.
              <Link to="/userprofile">Update now</Link>
            </span>
          )}
          {auth && (
            <Link to="/">
              <Button
                onClick={handleLogout}
                size="sm"
                className="py-0 btn btn-danger"
                style={{ marginLeft: "0.2rem" }}
              >
                Logout
              </Button>
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  ) : (
    <Navbar>
      <Container fluid>
        <NavbarBrand> Welcome to Expense Tracker!!!!</NavbarBrand>
        <Nav style={{ fontVariant: "light" }}>
          {isPremium && (
            <Button
              size="sm"
              className="py-0 btn btn-success"
              style={{ marginRight: "0.5rem" }}
              onClick={activatePremiumHandler}
            >
              Activate Premium
            </Button>
          )}
          {auth && <EmailVerify />}

          {auth && (
            <Button
              style={{ background: "none", border: "none" }}
              className="py-0 btn"
            >
              <span className={"para"}>
                Update your profile.
                <Link to="/userprofile">Update now</Link>
              </span>
            </Button>
          )}
          {auth && (
            <Link to="/">
              <Button
                onClick={handleLogout}
                size="sm"
                className="py-0 btn btn-danger"
                style={{ marginLeft: "0.2rem" }}
              >
                Logout
              </Button>
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Navbarr;
