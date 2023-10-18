import { EuiAvatar } from "@elastic/eui"
import Breadcrumbs from "./Breadcrumbs"
import Search_Menu from "./Search_Menu"
import Grid_test from "./grid_test"
import { Link } from "react-router-dom"

function Layout() {
    return (
        <>
            <Breadcrumbs></Breadcrumbs>
            <EuiAvatar name="Management" iconType="managementApp" />
            <Search_Menu></Search_Menu>
            <Grid_test></Grid_test>
        </>
    )
}

export default Layout
