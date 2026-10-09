"use client";

import styled from "styled-components";

export const PageLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.layout.sectionGap};

  .page-layout {
    &__header {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.lg};

      ${({ theme }) => theme.media.md} {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: ${({ theme }) => theme.space.xl};
      }
    }

    /* The title with its subtitle underneath. */
    &__heading {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.sm};
    }

    &__title {
      font-size: 1.75rem;
      line-height: 1.15;
      letter-spacing: -0.02em;

      ${({ theme }) => theme.media.md} {
        font-size: 2.25rem;
      }
    }

    /* A word or two of the title in the accent color. inline-block keeps it in one piece when
       the title wraps. */
    &__accent {
      display: inline-block;
      color: ${({ theme }) => theme.colors.primary};
    }

    &__section {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.lg};
    }

    &__description {
      max-width: 52ch;
      color: ${({ theme }) => theme.colors.muted};
      line-height: 1.5;
    }
  }
`;
