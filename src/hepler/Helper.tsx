import { EuiIcon, slugify } from "@elastic/eui";
import { NavigateFunction, useNavigate } from "react-router-dom";


export function createItemMenu(label: string, options: any, navigate: NavigateFunction) {
    const item = {
        id: slugify(label),
        name: label,
        onClick: options.onClick,
        ...options
    };
    if (options) {
        if (options.icontype) {
            item.icon = <EuiIcon type={options.icontype} />;
        }

        if (options.path) {
            item.onClick = () => {
                navigate(options.path);
            };
        }

        if (options.items) {
            item.items = options.items.map((subItem: any) => createItemMenu(subItem.label, subItem, navigate));
        }
    }


    return item;
}