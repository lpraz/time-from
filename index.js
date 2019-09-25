import { h, app } from "hyperapp"
import { interval } from "@hyperapp/time"
import { HistoryPush } from "hyperapp-fx"

const getQueryParams = () =>
    new URLSearchParams(window.location.search.substr(1));

const SetFromOnInput = prop => [
    (state, value) => {
        const inner = (obj, prop, value) => {
            let newObj = { ...obj };
            if (prop.length == 1)
                newObj[prop[0]] = value;
            else
                newObj[prop[0]] = inner(obj[prop[0]], prop.slice(1), value);
                
            return newObj;
        };
        return inner(state, prop.split('.'), value);
    },
    event => event.target.value
];

// TODO: leap years, seconds, etc.? (library?)
const diffTime = (src, dest) => {
    const per = (before, after) => {
        const factors = [1000, 60, 60, 24, 365];
        const units = ["ms", "s", "m", "h", "d", "y"];
        
        return factors.slice(units.indexOf(before), units.indexOf(after))
            .reduce((prev, curr) => prev * curr, 1);
    };

    let earlier = src > dest ? dest : src;
    let later = src > dest ? src : dest;
    let diff = later - earlier;

    let count = src > dest ? "up" : "down";
    let years = Math.floor(diff / per("ms", "y"));
    let yearsRemainder = diff % per("ms", "y");
    let days = Math.floor(yearsRemainder / per("ms", "d"));
    let daysRemainder = yearsRemainder % per("ms", "d");
    let hours = Math.floor(daysRemainder / per("ms", "h"));
    let hoursRemainder = daysRemainder % per("ms", "h");
    let minutes = Math.floor(hoursRemainder / per("ms", "m"));
    let minutesRemainder = hoursRemainder % per("ms", "m");
    let seconds = Math.floor(minutesRemainder / per("ms", "s"));
    
    return { count, years, days, hours, minutes, seconds };
};

const permalinkUri = (time, event) =>
    window.location + "?time=" + time + "&event=" + event;

const toDisplay = state => {
    let targetTime = Date.UTC(
        state.newTime.year,
        state.newTime.month - 1,
        state.newTime.day,
        state.newTime.hours,
        state.newTime.minutes,
        state.newTime.seconds);
        
    return [
        {
            currentTime: Date.now(),
            targetTime: targetTime,
            event: state.newTime.event
        },
        HistoryPush({
            state,
            url: permalinkUri(targetTime, state.newTime.event)
        })
    ];
};

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

    return (
        <div>
            <p>{diff.count == "down" ? "There are" : "It has been"}</p>
            {displayUnit(diff.years, "year")}
            {displayUnit(diff.days, "day")}
            {displayUnit(diff.hours, "hour")}
            {displayUnit(diff.minutes, "minute")}
            {displayUnit(diff.seconds, "second")}
            <p>{diff.count == "down" ? "until" : "since"} {state.event}</p>
            <a href={permalinkUri(state.targetTime, state.event)}>Permalink</a>
        </div>
    )
};

// TODO: UTC/local selection
// TODO: 12h/24h selection
// TODO: left-pad numbers (16:3:5 => 16:03:05)
// TODO: month <select>
const Create = state => (
    <div>
        <p>Time:</p>
        <input
            type="text"
            size="2"
            value={state.newTime.hours}
            oninput={SetFromOnInput("newTime.hours")} />:
        <input
            type="text"
            size="2"
            value={state.newTime.minutes}
            oninput={SetFromOnInput("newTime.minutes")} />:
        <input
            type="text"
            size="2"
            value={state.newTime.seconds}
            oninput={SetFromOnInput("newTime.seconds")} />,
        &nbsp;
        <input
            type="text"
            size="2"
            value={state.newTime.month}
            oninput={SetFromOnInput("newTime.month")} /> &nbsp;
        <input
            type="text"
            size="2"
            value={state.newTime.day}
            oninput={SetFromOnInput("newTime.day")} />, &nbsp;
        <input
            type="text"
            size="4"
            value={state.newTime.year}
            oninput={SetFromOnInput("newTime.year")} />
        <p>Event (nouns look best):</p>
        <input
            type="text"
            size="50"
            value={state.newTime.event}
            oninput={SetFromOnInput("newTime.event")} />
        <p><button onclick={toDisplay}>Count!</button></p>
    </div>
);

// TODO: get current time from effect
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