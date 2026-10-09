"use client";

import styled from "styled-components";

export const PagePlaceholderWrapper = styled.div`
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
