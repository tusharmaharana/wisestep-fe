import styled from "@emotion/styled";
import React from "react";
import { Spinner } from "react-bootstrap";

interface LoaderProps {
  type: "full" | "small";
}

const Loader = ({ type }: LoaderProps) => {
  return (
    <>
      {type === "full" ? (
        <StyleSpinner animation="border" role="status" variant="light">
          <span className="visually-hidden">Loading...</span>
        </StyleSpinner>
      ) : (
        <Spinner animation="border" variant="light" size="sm" />
      )}
    </>
  );
};

const StyleSpinner = styled(Spinner)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export default Loader;
