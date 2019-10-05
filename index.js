import { h, app } from "hyperapp"
import { interval } from "@hyperapp/time"
import { HistoryPush } from "hyperapp-fx"

const getQueryParams = () =>
    new URLSearchParams(window.location.search.substr(1));

const getDateFromDateTime = date => date.toISOString().slice(0, 10);

const getTimeFromDateTime = date => date.toISOString().slice(11, 19);

const SetFromOnInput = prop => (state, event) => {
    const inner = (obj, prop, value) => {
        let newObj = { ...obj };
        if (prop.length == 1)
            newObj[prop[0]] = value;
        else
            newObj[prop[0]] = inner(obj[prop[0]], prop.slice(1), value);
            
        return newObj;
    };
    return inner(state, prop.split('.'), event.target.value);
};

const SetIsInUtc = value => [
    state => ({
        ...state,
        newTime: {
            ...state.newTime,
            isInUtc: value
        }
    }),
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

const pathWithoutQuery = () =>
    `${location.protocol}//${location.host}${location.pathname}`;

const permalinkUri = (time, event) =>
    `${pathWithoutQuery()}?time=${time}&event=${event}`;

const toDisplay = state => {
    let targetTime = new Date(
        `${state.newTime.date}T${state.newTime.time}` +
            (state.newTime.isInUtc ? "Z" : "")
    );
    
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
            <p>
                <a href={permalinkUri(state.targetTime, state.event)}>
                    Permalink
                </a>
            </p>
            <p>
                <a href={pathWithoutQuery()}>
                    Return
                </a>
            </p>
        </div>
    )
};

// Separate date/time inputs for Firefox compatibility
const Create = state => (
    <div>
        <p>Time:</p>
        <p>
            <input
                type="date"
                value={state.newTime.date}
                oninput={SetFromOnInput("newTime.date")} />
            <input
                type="time"
                step="1"
                value={state.newTime.time}
                oninput={SetFromOnInput("newTime.time")} />
        </p>
        <p>
            <input
                id="local"
                type="radio"
                name="timeZone"
                value="local"
                checked={!state.newTime.isInUtc}
                onchange={SetIsInUtc(false)} />
            <label for="local">Local time</label>
            <input
                id="utc"
                type="radio"
                name="timeZone"
                value="utc"
                checked={state.newTime.isInUtc}
                onchange={SetIsInUtc(true)} />
            <label for="utc">UTC</label>
        </p>
        <p>Event:</p>
        <input
            type="text"
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
            date: getDateFromDateTime(new Date()),
            time: getTimeFromDateTime(new Date()),
            isInUtc: true,
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