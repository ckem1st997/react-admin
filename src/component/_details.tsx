import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

interface HomeProps {
  text?: string; // Đối số text có kiểu chuỗi, và là tùy chọn (?).
}

const Details: React.FC<HomeProps> = ({ text }) => {
    let { id } = useParams();

  return (
    <h1>Home {id}</h1>
  );
};

export default Details;