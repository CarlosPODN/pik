"use client";

import styled from "styled-components";

// A tinted, bordered box for a list section. It keeps its height whether it holds an empty
// state or the list itself, so the section doesn't jump when the first item is added.
export const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  min-height: ${({ theme }) => theme.layout.panelMinHeight};
  padding: ${({ theme }) => `${theme.space.lg} ${theme.space.xl}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};

  /* Same heading style as the settings cards (FormCard). */
  .panel__heading {
    font-size: 1.375rem;
    letter-spacing: -0.01em;
  }
`;
