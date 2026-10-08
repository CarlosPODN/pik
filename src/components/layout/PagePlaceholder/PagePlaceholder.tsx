"use client";

import { PagePlaceholderWrapper } from "./PagePlaceholder.styles";

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
