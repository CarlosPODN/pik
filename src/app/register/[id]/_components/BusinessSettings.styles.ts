"use client";

import styled from "styled-components";

export const BusinessSettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .business-settings {
    &__title {
      margin-bottom: ${({ theme }) => theme.space.md};
      font-size: 1.75rem;
      line-height: 1.15;
      letter-spacing: -0.02em;

      ${({ theme }) => theme.media.md} {
        font-size: 2.25rem;
      }
    }
  }
`;
