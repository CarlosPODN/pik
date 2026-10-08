"use client";

import styled from "styled-components";

const Main = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem 1rem;
`;

const Card = styled.section`
  max-width: 560px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
`;

const Code = styled.code`
  font-family: ${({ theme }) => theme.fonts.mono};
  background: ${({ theme }) => theme.colors.border};
  padding: 0.15rem 0.4rem;
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const Button = styled.a`
  align-self: center;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.9;
  }
`;

export default function Hero() {
  return (
    <Main>
      <Card>
        <Title>Next.js + styled-components</Title>
        <Subtitle>
          Empieza editando <Code>src/app/page.tsx</Code>. El tema vive en{" "}
          <Code>src/styles/theme.ts</Code>.
        </Subtitle>
        <Button href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
          Documentación
        </Button>
      </Card>
    </Main>
  );
}
