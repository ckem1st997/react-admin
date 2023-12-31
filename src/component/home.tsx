import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Chart1 from "./chart1";

interface HomeProps {
  text?: string; // Đối số text có kiểu chuỗi, và là tùy chọn (?).
}

const Home: React.FC<HomeProps> = ({ text }) => {
  // const location = useLocation();

  // // Sử dụng useEffect để theo dõi thay đổi trong location (URL)
  // useEffect(() => {
  // }, [location.pathname]);

  return (
    <>
      <h1>Home {text}</h1>
      <Chart1/>
    </>


  );
};

export default Home;