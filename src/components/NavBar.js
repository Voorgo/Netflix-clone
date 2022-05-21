import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, logOut } = UserAuth();

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
      {user?.email ? (
        <NavButtons>
          <Link to="/" className="home-button">
            Home
          </Link>
          <Link to="/account">
            <SignInButton className="signIn">Account</SignInButton>
          </Link>
          <SignUpButton onClick={handleLogOut}>Logout</SignUpButton>
        </NavButtons>
      ) : (
        <NavButtons>
          <Link to="/" className="home-button">
            Home
          </Link>
          <Link to="/login">
            <SignInButton className="signIn">Sign In</SignInButton>
          </Link>
          <Link to="/signup">
            <SignUpButton>Sign Up</SignUpButton>
          </Link>
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

  @media (max-width: 550px) {
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

  .home-button {
    text-decoration: none;
    color: white;
    font-size: 2rem;
    font-weight: bold;
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

export default NavBar;
