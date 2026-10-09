"use client";

import styled from "styled-components";

export const StaffMemberDialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  margin-top: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.colors.foreground};
`;
