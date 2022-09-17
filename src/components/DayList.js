import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      setDay={() => props.setDay(day.name)}
      selected={day.name === props.day}
    />
  ));

  return <ul>{days}</ul>;
}
