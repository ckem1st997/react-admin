import { ErrorResponse, isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";
import _404 from "../component/_404";

export default function ResponseHander() {
    const navigate = useNavigate();
    const error  = useRouteError() as ErrorResponse;
    
    if (isRouteErrorResponse(error)) {
        if (error.status == 404) {
            console.log(error.status)
            return <_404 />;
        }

        if (error.status === 401) {
            console.log(error.status)

            return <div>You aren't authorized to see this</div>;
        }

        if (error.status == 503) {
            return <div>Looks like our API is down</div>;
        }

        if (error.status == 401) {
            navigate("/dsadas")
        }
    }

    return <div>11111111111</div>;
}


