import { h, app } from "hyperapp"
import { interval } from "@hyperapp/time"

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

const toDisplay = state => ({
    currentTime: Date.now(),
    targetTime: Date.UTC(
        state.newTime.year,
        state.newTime.month - 1,
        state.newTime.day,
        state.newTime.hours,
        state.newTime.minutes,
        state.newTime.seconds),
    event: state.newTime.event
});

const Tick = (state, time) => ({
    ...state,
    currentTime: time
});

const If = (pred, view) => pred ? view : "";

const Display = state => {
    const displayUnit = (amount, unit) => If(amount > 0, (
        <p><strong>{amount}</strong> {unit}{amount > 1 ? "s" : ""}</p>
    ));
    
    let diff = diffTime(state.currentTime, state.targetTime);
    let permalinkUri = window.location +
            "?time=" + state.targetTime +
            "&event=" + state.event;

    return (
        <div>
            <p>{diff.count == "down" ? "There are" : "It has been"}</p>
            {displayUnit(diff.years, "year")}
            {displayUnit(diff.days, "day")}
            {displayUnit(diff.hours, "hour")}
            {displayUnit(diff.minutes, "minute")}
            {displayUnit(diff.seconds, "second")}
            <p>{diff.count == "down" ? "until" : "since"} {state.event}</p>
            <a href={permalinkUri}>Permalink</a>
        </div>
    )
};

// TODO: UTC/local selection
// TODO: 12h/24h selection
// TODO: fix state.newTime.* binding
// TODO: left-pad numbers (16:3:5 => 16:03:05)
// TODO: month <select>
const Create = state => (
    <div>
        <p>Time:</p>
        <input size="2" value={state.newTime.hours}></input>:
        <input size="2" value={state.newTime.minutes}></input>:
        <input size="2" value={state.newTime.seconds}></input>,
        &nbsp;
        <input size="2" value={state.newTime.month}></input> &nbsp;
        <input size="2" value={state.newTime.day}></input>, &nbsp;
        <input size="4" value={state.newTime.year}></input>
        <p>Event (nouns look best):</p>
        <input size="50" value={state.newTime.event}></input>
        <p><button onclick={toDisplay}>Count!</button></p>
    </div>
);

app({
    init: () => ({
        currentTime: Date.now(),
        targetTime: getQueryParams().get("time"),
        event: getQueryParams().get("event"),
        newTime: {
            year: new Date().getUTCFullYear(),
            month: new Date().getUTCMonth() + 1,
            day: new Date().getUTCDate(),
            hours: new Date().getUTCHours(),
            minutes: new Date().getUTCMinutes(),
            seconds: new Date().getUTCSeconds(),
            event: ""
        }
    }),
    view: state => state.targetTime === null ? Create(state) : Display(state),
    subscriptions: state => [
        state.targetTime !== null &&
            interval(Tick, {
                delay: 1000
            })
    ],
    node: document.getElementById("app")
});