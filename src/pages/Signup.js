import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const { signUp } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const checkBox = useRef(null);

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    try {
      await signUp(email, password, checkBox, setError);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <img
        src={
          "https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        }
        alt="background-banner"
      />
      <div className="layer"></div>
      <FormContainer>
        <div className="signup-content">
          <h1>Sign Up</h1>
          {error ? <p className="error-message">{error}</p> : null}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Sign Up</button>
          </form>
          <Help>
            <div>
              <input type="checkbox" id="remember-me" ref={checkBox} />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <span>Need help?</span>
          </Help>
          <div className="switch-login">
            <span>Already subscribed to Netflix?</span>
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
  }

  @media (max-width: 550px) {
    img {
      display: none;
    }
  }
`;

const FormContainer = styled.div`
  width: 100%;
  position: relative;
  padding-top: 10rem;

  .signup-content {
    max-width: 450px;
    height: 600px;
    background: rgba(0, 0, 0, 0.75);
    color: white;
    padding: 6rem;
    margin: 0 auto;
    border-radius: 5px;
  }

  .error-message {
    font-size: 1.5rem;
    padding: 1rem;
    background: #fc0352;
    color: white;
    margin: 2rem 0;
  }

  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  input {
    width: 100%;
    outline: none;
    border: none;
    border-radius: 4px;
    background: #333;
    padding: 1.5rem;
    font-size: 1.7rem;
    color: white;

    &:focus {
      outline: 1px solid white;
    }

    &::placeholder {
      color: #8c8c8c;
    }
  }

  form button {
    height: 5rem;
    outline: none;
    border: none;
    border-radius: 4px;
    background: red;
    color: white;
    font-size: 1.7rem;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1rem;
  }

  .switch-login {
    margin-top: 3rem;
    font-size: 1.4rem;
    color: #b3b3b3;
  }

  .switch-login a {
    color: white;
    text-decoration: none;
    margin-left: 0.4rem;
  }

  @media (max-width: 550px) {
    .signup-content {
      height: 100%;
      max-width: 100%;
      padding: 20rem 6rem 0 6rem;
    }

    & {
      width: 100%;
      height: 100%;
      padding: 0;
    }
  }
`;

const Help = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  color: #b3b3b3;
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    user-select: none;
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
  }
`;

export default Signup;
