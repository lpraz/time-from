import { h, app } from 'hyperapp'

const getQueryParams = () =>
    new URLSearchParams(window.location.search.substr(1));

// TODO: leap years, seconds, etc.?
const diffTime = (src, dest) => {
    const diffUnit = (later, earlier, factor) => 
        Math.floor(later / factor - earlier / factor);
    
    const subtractHigherUnit = (lower, higher, factor) => higher === 0 ?
        lower :
        lower % factor;

    const per = (before, after) => {
        const factors = [1000, 60, 60, 24, 365];
        const units = ["ms", "s", "m", "h", "d", "y"];
        
        return factors.slice(units.indexOf(before), units.indexOf(after))
            .reduce((prev, curr) => prev * curr, 1);
    };

    let earlier = src > dest ? dest : src;
    let later = src > dest ? src : dest;

    let count = src > dest ? "up" : "down";
    let years = diffUnit(later, earlier, per("ms", "y"));
    let days = subtractHigherUnit(
        diffUnit(later, earlier, per("ms", "d")),
        years, per("d", "y"));
    let hours = subtractHigherUnit(
        diffUnit(later, earlier, per("ms", "h")),
        days, per("h", "d"));
    let minutes = subtractHigherUnit(
        diffUnit(later, earlier, per("ms", "m")),
        hours, per("m", "h"));
    let seconds = subtractHigherUnit(
        diffUnit(later, earlier, per("ms", "s")),
        minutes, per("s", "m"));
    
    return { count, years, days, hours, minutes, seconds };
};

const Display = state => {
    const displayUnit = (amount, unit) => amount > 0 ? (
        <p><strong>{amount}</strong> {unit}{amount > 1 ? "s" : ""}</p>
    ) : "";

    let diff = diffTime(state.currentTime, state.targetTime);
    return (
        <div>
            {displayUnit(diff.years, "year")}
            {displayUnit(diff.days, "day")}
            {displayUnit(diff.hours, "hour")}
            {displayUnit(diff.minutes, "minute")}
            {displayUnit(diff.seconds, "second")}
            <p>{diff.count == "down" ? "until" : "since"} {state.event}</p>
        </div>
    )
};

const Create = state => (
    <p>Create</p>
);

app({
    init: () => ({
        currentTime: Date.now(),
        targetTime: getQueryParams().get("time"),
        event: getQueryParams().get("event")
    }),
    view: state => state.time !== null ? Display(state) : Create(state),
    node: document.getElementById("app")
});