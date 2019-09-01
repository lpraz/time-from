import { h, app } from 'hyperapp'

const getQueryParams = () =>
    new URLSearchParams(window.location.search.substr(1));

const Display = state => (
    <div>
        <h1>Some time</h1>
        <p>until {state.event}</p>
    </div>
);

const Create = state => (
    <p>Create</p>
);

app({
    init: () => ({
        time: getQueryParams().get("time"),
        event: getQueryParams().get("event")
    }),
    view: state => state.time !== null ? Display(state) : Create(state),
    node: document.getElementById("app")
});