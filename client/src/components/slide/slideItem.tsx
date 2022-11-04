import styled from "styled-components";
import Slick from "../slider/Slick";

// ----------------------------css 시작----------------------------
interface itemsProps {
  item: string;
  name: string;
}

const SliderItem = styled.div`
  max-width: 100%;
`;

const Image = styled.img`
  width: 100%;
  min-width: 1200px;
  max-height: auto;
`;
// ----------------------------css 끝----------------------------

const items: itemsProps[] = [
  {
    item: "https://b-jisoo.github.io/Martket-J/main_banner.jpg",
    name: "이미지01",
  },
  {
    item: "https://b-jisoo.github.io/Martket-J/main_banner2.jpg",
    name: "이미지02",
  },
  {
    item: "https://b-jisoo.github.io/Martket-J/main_banner3.jpg",
    name: "이미지03",
  },
];

function Item() {
  return (
    <Slick>
      {items.map((item, index) => (
        <SliderItem key={index}>
          <Image src={item.item} alt={item.name} />
        </SliderItem>
      ))}
    </Slick>
  );
}

export default Item;
