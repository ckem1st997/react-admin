import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import _404 from "../component/_404";

export default function ResponseHander() {
    const error = useRouteError();
  console.log(error)
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
        return <_404 />;
      }
  
    //   if (error.status === 401) {
    //     return <div>You aren't authorized to see this</div>;
    //   }
  
      if (error.status === 503) {
        return <div>Looks like our API is down</div>;
      }
  
      if (error.status === 401) {
        return <div>🫖</div>;
      }
    }
  
    return <div>Something went wrong</div>;
  }