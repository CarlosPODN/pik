"use client";

import styled from "styled-components";

const PagePlaceholderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};

  .page-placeholder {
    &__title {
      font-size: 1.5rem;
      letter-spacing: -0.02em;

      ${({ theme }) => theme.media.md} {
        font-size: 2rem;
      }
    }

    &__description {
      color: ${({ theme }) => theme.colors.muted};
      line-height: 1.5;
    }
  }
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
    <PagePlaceholderWrapper className="page-placeholder">
      <h1 className="page-placeholder__title">{title}</h1>
      <p className="page-placeholder__description">{description}</p>
    </PagePlaceholderWrapper>
  );
}
