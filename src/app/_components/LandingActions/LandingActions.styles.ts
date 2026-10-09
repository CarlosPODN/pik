"use client";

import styled from "styled-components";

export const LandingActionsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};

  .landing-actions {
    &__header {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.xs};
    }

    &__title {
      font-size: 1.375rem;
      letter-spacing: -0.01em;

      ${({ theme }) => theme.media.md} {
        font-size: 1.75rem;
      }
    }

    &__subtitle {
      color: ${({ theme }) => theme.colors.muted};
      line-height: 1.5;
    }
  }
`;
