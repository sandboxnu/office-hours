export default function getInitialsFromName(name: string): string {
  if (name) {
    const initialsRegex = name.replaceAll("'", "").match(/\b\w/g) || [];
    return (
      (initialsRegex.shift() || "") + (initialsRegex.pop() || "")
    ).toUpperCase();
  }
  return "";
}
