import styled from "@emotion/styled";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import Loader from "../widgets/Loader";
import LogoutPreviousSession from "./LogoutPreviousSession";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const { state, actions } = useAuth();

  const handleOnClick = () => {
    setLoading(true);
    actions?.logout().then(() => {
      setLoading(false);
    });
  };

  const LogoutCurrentSession = () => (
    <StyledContainer>
      <StyledCard>
        <Card.Body>
          <h4 className="text-center mb-4">Thank you for logging in</h4>
          <Button
            variant="danger"
            disabled={loading}
            className="w-100 mb-2"
            type="submit"
            onClick={handleOnClick}
          >
            Logout
          </Button>
        </Card.Body>
      </StyledCard>
    </StyledContainer>
  );

  return (
    <>
      {!state?.loading ? (
        <>
          {!state?.previousSessionId ? (
            <LogoutCurrentSession />
          ) : (
            <LogoutPreviousSession />
          )}
        </>
      ) : (
        <Loader type="full" />
      )}
    </>
  );
};

export default Logout;

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledCard = styled(Card)`
  width: 400px;
  background-color: #161b22;
  border: 0.5px solid #e1e2e2a9;
`;
