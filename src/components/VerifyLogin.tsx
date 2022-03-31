import styled from "@emotion/styled";
import React, { SyntheticEvent, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const VerifyLogin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const { actions } = useAuth();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      actions?.verifyLogin(+input);
    } catch (error) {
      setError("Failed to Verify Login");
    }

    setLoading(false);
  };

  const handleOnChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (!isNaN(+target.value)) {
      setInput(target.value);
    }
  };

  return (
    <StyledContainer>
      <h4 className="text-center mb-4" style={{ width: "400px" }}>
        Please enter the 4-digit verification code sent to your given email-id{" "}
      </h4>
      <StyledCard>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-4">
              <Form.Label>4-digit Code</Form.Label>
              <StyledInput
                type="text"
                maxLength="4"
                // ref={}
                required
                value={input}
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mb-2" type="submit">
              Verify
            </Button>
          </Form>
        </Card.Body>
      </StyledCard>
    </StyledContainer>
  );
};

export default VerifyLogin;

const StyledContainer = styled.div`
  height: 50vh;
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

const StyledInput = styled(Form.Control)`
  text-align: center;
  line-height: 30px;
  font-size: 30px;
  color: #f8ffff;
  background-color: #0d1117;
  border: 0.5px solid #e1e2e2a9;
  &:focus {
    color: #f8ffff;
    background-color: #0d1117;
    border: 0.5px solid #e1e2e2a9;
  }
`;
