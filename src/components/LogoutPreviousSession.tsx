import styled from "@emotion/styled";
import React, { useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";

const LogoutPreviousSession = () => {
  const [loading, setLoading] = useState(false);
  return (
    <StyledContainer>
      <StyledCard>
        <Card.Body>
          <Alert variant="warning">This email is already logged in <br /> Logout from previous session to continue</Alert>
          <Button
            variant="danger"
            disabled={loading}
            className="w-100 mb-2"
            type="submit"
          >
            Logout Previous Session
          </Button>
        </Card.Body>
      </StyledCard>
    </StyledContainer>
  );
};

export default LogoutPreviousSession;

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
