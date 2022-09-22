import styled from "styled-components";

const ConfirmationAlert = () => {
  return (
    <Confirmation>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
          viewBox="0 0 20 20"
          fill="green"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      Success!
    </Confirmation>
  );
};

const Confirmation = styled.div`
  position: fixed;
  top: 3rem;
  color: black;
  font-size: 1.7rem;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 50px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-weight: bold;
  z-index: 1001;

  .icon {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export default ConfirmationAlert;
