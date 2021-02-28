export default function getInitialsFromName(name: string): string {
  if (name) {
    const initialsRegex =
      name.replace("'", "").replace("-", "").match(/\b\w/g) || [];
    return (
      (initialsRegex.shift() || "") + (initialsRegex.pop() || "")
    ).toUpperCase();
  }
  return "";
}
