import { h, app } from "hyperapp"

app({
    init: "Hello, world!",
    view: state => (
        <div>
            <p>{state}</p>
        </div>
    ),
    node: document.getElementById("app")
})