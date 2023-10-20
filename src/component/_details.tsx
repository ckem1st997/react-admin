import { EuiButtonEmpty } from "@elastic/eui";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface HomeProps {
    text?: string; // Đối số text có kiểu chuỗi, và là tùy chọn (?).
}

const Details: React.FC<HomeProps> = ({ text }) => {
    let { id } = useParams();
    const navigate = useNavigate();

    return (
        <>
            <h1>Home {id}</h1>
            <EuiButtonEmpty iconType="arrowLeft" flush="both" onClick={() => navigate(-1)}>
                Quay lại
            </EuiButtonEmpty>
        </>

    );
};

export default Details;