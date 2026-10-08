"use client";

import styled from "styled-components";

const Wrapper = styled.main.attrs({ className: "page-placeholder" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => `${theme.space.xl} ${theme.space.lg}`};

  ${({ theme }) => theme.media.md} {
    padding: ${({ theme }) => theme.space.xxl};
  }
`;

const Title = styled.h1.attrs({ className: "page-placeholder__title" })`
  font-size: 1.5rem;
  letter-spacing: -0.02em;

  ${({ theme }) => theme.media.md} {
    font-size: 2rem;
  }
`;

const Description = styled.p.attrs({ className: "page-placeholder__description" })`
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

// Temporary page body for routes whose flow isn't built yet.
export default function PagePlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Wrapper>
  );
}
