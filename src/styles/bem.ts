type Modifiers = Record<string, boolean | undefined>;

// Builds BEM class names for a block: bem("sidebar")("nav") → "sidebar__nav",
// bem("nav-item")(undefined, { active: true }) → "nav-item nav-item--active".
// styled-components still scopes the styles; these classes make the DOM readable
// and give tests stable selectors.
export function bem(block: string) {
  return (element?: string, modifiers: Modifiers = {}) => {
    const base = element ? `${block}__${element}` : block;
    const active = Object.keys(modifiers).filter((name) => modifiers[name]);
    return [base, ...active.map((name) => `${base}--${name}`)].join(" ");
  };
}
