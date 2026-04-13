//PageLayout.tsx
import React from "react";
import { Container } from "react-bootstrap";

interface PageLayoutProps {
  children?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <Container fluid className="page-container">
      <div className="page-main">
        <main className="page-content">{children}</main>
      </div>
    </Container>
  );
};

export default PageLayout;
