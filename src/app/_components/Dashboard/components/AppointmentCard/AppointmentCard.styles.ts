"use client";

import styled from "styled-components";

export const AppointmentCardWrapper = styled.article`
  display: flex;
  gap: ${({ theme }) => theme.space.lg};
  height: 100%;
  padding: ${({ theme }) => theme.space.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};

  .appointment-card {
    &__date {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 56px;
      height: 64px;
      border-radius: ${({ theme }) => theme.radii.md};
      background: ${({ theme }) => theme.colors.primarySoft};
      color: ${({ theme }) => theme.colors.primary};
    }

    &__day {
      font-size: 1.375rem;
      font-weight: 800;
      line-height: 1;
    }

    &__month {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    &__body {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.xs};
      flex: 1;
      min-width: 0;
    }

    &__service {
      font-size: 1rem;
    }

    &__meta {
      color: ${({ theme }) => theme.colors.muted};
      font-size: 0.875rem;
    }

    &__footer {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: ${({ theme }) => theme.space.sm};
      margin-top: ${({ theme }) => theme.space.xs};
      font-size: 0.875rem;
    }

    &__time {
      &::first-letter {
        text-transform: uppercase;
      }
    }

    &__price {
      font-weight: 700;
    }
  }
`;
