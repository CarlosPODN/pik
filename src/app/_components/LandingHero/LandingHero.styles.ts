"use client";

import styled from "styled-components";

export const LandingHeroWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  padding: ${({ theme }) => `${theme.space.xl} ${theme.space.lg}`};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};

  ${({ theme }) => theme.media.md} {
    gap: ${({ theme }) => theme.space.xl};
    padding: ${({ theme }) => `${theme.space.xxl} ${theme.space.xxl}`};
  }

  .landing-hero {
    &__eyebrow {
      color: ${({ theme }) => theme.colors.onPrimaryMuted};
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    &__title {
      max-width: 18ch;
      font-size: 1.875rem;
      line-height: 1.15;
      letter-spacing: -0.02em;

      ${({ theme }) => theme.media.md} {
        font-size: 2.75rem;
      }
    }

    &__intro {
      max-width: 60ch;
      color: ${({ theme }) => theme.colors.onPrimaryMuted};
      font-size: 1rem;
      line-height: 1.6;

      ${({ theme }) => theme.media.md} {
        font-size: 1.125rem;
      }
    }

    &__categories {
      display: flex;
      flex-wrap: wrap;
      gap: ${({ theme }) => theme.space.sm};
      list-style: none;
    }

    &__category {
      padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md}`};
      border-radius: ${({ theme }) => theme.radii.pill};
      background: ${({ theme }) => theme.colors.onPrimarySubtle};
      font-size: 0.875rem;
      font-weight: 500;
    }

    &__highlights {
      display: grid;
      gap: ${({ theme }) => theme.space.md};
      padding-top: ${({ theme }) => theme.space.lg};
      border-top: 1px solid ${({ theme }) => theme.colors.onPrimarySubtle};
      list-style: none;

      ${({ theme }) => theme.media.md} {
        grid-template-columns: repeat(3, 1fr);
        padding-top: ${({ theme }) => theme.space.xl};
      }
    }

    &__highlight {
      display: flex;
      align-items: flex-start;
      gap: ${({ theme }) => theme.space.sm};
      font-size: 0.9375rem;
      line-height: 1.4;
    }

    &__check {
      flex-shrink: 0;
      color: ${({ theme }) => theme.colors.success};
    }
  }
`;
