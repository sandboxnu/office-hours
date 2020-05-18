import { Club } from "@template/common";

export default function ClubList({ clubs }: { clubs: Club[] }) {
  return clubs.length > 0 ? (
    <ul>
      {clubs.map((c) => (
        <li key={c.id}>
          The club {c.name} has a {c.rating} rating
        </li>
      ))}
    </ul>
  ) : (
    <div>No clubs in the database</div>
  );
}
