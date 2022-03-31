import styled from "@emotion/styled";
import React, { SyntheticEvent, useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const email = emailRef.current?.value;
    } catch (error) {
      setError("Failed to create an account");
    }

    setLoading(false);
  };

  return (
    <StyledContainer>
      <h4 className="text-center mb-4">Login to Wisestep-Project</h4>
      <StyledCard>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="my-4">
              <Form.Label>Email</Form.Label>
              <StyledInput
                type="email"
                ref={emailRef}
                required
                className="p-2"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mb-2" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </StyledCard>
    </StyledContainer>
  );
};

export default Login;

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
  color: #f8ffff;
  background-color: #0d1117;
  border: 0.5px solid #e1e2e2a9;
  &:focus {
    color: #f8ffff;
    background-color: #0d1117;
    border: 0.5px solid #e1e2e2a9;
  }
`;
