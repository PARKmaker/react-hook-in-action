import { TBookable } from "./Types.ts";
import { useState } from "react";
import { sessions, days } from "../../static.json";

export default function BookableDetails({ bookable }: { bookable: TBookable }) {
  const [hasDetails, setHasDetails] = useState(true);

  const toggleDetails = () => {
    setHasDetails((has) => !has);
  };

  return (
    bookable && (
      <div className="bookable-details">
        <div className="item">
          <div className="item-header">
            <h2>{bookable.title}</h2>
            <span className="controls">
              <label>
                <input
                  type="checkbox"
                  checked={hasDetails}
                  onChange={toggleDetails}
                />
                Show Details
              </label>
            </span>
          </div>

          <p>{bookable.notes}</p>

          {hasDetails && (
            <div className="item-details">
              <h3>Availability</h3>
              <div className="bookable-availability">
                <ul>
                  {bookable.days.sort().map((d) => (
                    <li key={d}>{days[d]}</li>
                  ))}
                </ul>
                <ul>
                  {bookable.sessions.map((s) => (
                    <li key={s}>{sessions[s]}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}
