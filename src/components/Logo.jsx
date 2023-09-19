import LogoImg from "../components/assets/Logo_Flowers_600x600.png";

function Logo() {
  return (
    <a href="/">
      <img id="logo" src={LogoImg} alt="logo" />
    </a>
  );
}

export default Logo;
