import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const NavBar = () => {
  const { logOut } = UserAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Nav>
      <LogoLink to="/">NETFLIX</LogoLink>
      {JSON.parse(localStorage.getItem("user")) ? (
        <NavButtons>
          <div className="navigation">
            <Link to="/" className="navigation-button">
              Home
            </Link>
            <Link to="/search" className="navigation-button">
              Search
            </Link>
          </div>
          <div className="navigation">
            <Link to="/account">
              <SignInButton className="signIn">Account</SignInButton>
            </Link>
            <SignUpButton onClick={handleLogOut}>Logout</SignUpButton>
          </div>
        </NavButtons>
      ) : (
        <NavButtons>
          <div className="navigation">
            <Link to="/" className="navigation-button">
              Home
            </Link>
            <Link to="/search" className="navigation-button">
              Search
            </Link>
          </div>
          <div className="navigation">
            <Link to="/login">
              <SignInButton className="signIn">Sign In</SignInButton>
            </Link>
            <Link to="/signup">
              <SignUpButton>Sign Up</SignUpButton>
            </Link>
            <Demo
              onClick={() =>
                signInWithEmailAndPassword(auth, "test@test.com", "123456")
              }
            >
              Demo
            </Demo>
          </div>
        </NavButtons>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  padding: 2rem 4rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 1000;

  @media (max-width: 620px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const LogoLink = styled(Link)`
  font-size: 4rem;
  text-decoration: none;
  color: red;
  font-weight: 600;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 2rem;

  a {
    align-self: center;
  }

  .navigation-button {
    text-decoration: none;
    color: white;
    font-size: 2rem;
    font-weight: bold;
  }

  .navigation {
    display: flex;
    justify-content: space-evenly;
    gap: 1rem;
  }

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const SignInButton = styled.button`
  outline: none;
  background: none;
  font-size: 1.7rem;
  cursor: pointer;
  color: white;
  padding: 0.7rem 1.6rem;
  align-self: center;
  border-radius: 0.3rem;
`;
const SignUpButton = styled(SignInButton)`
  background: red;
  border: none;

  &:active {
    background: #a11202;
  }
`;

const Demo = styled(SignInButton)`
  background: red;
  border: none;

  &:active {
    background: #a11202;
  }
`;

export default NavBar;
