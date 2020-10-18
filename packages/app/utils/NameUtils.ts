export default function getInitialsFromName(name: string): string {
  if (name) {
    const initialsRegex = name.match(/\b\w/g) || [];
    return (
      (initialsRegex.shift() || "") + (initialsRegex.pop() || "")
    ).toUpperCase();
  }
  return "";
}
