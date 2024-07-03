import { Global, css, connect } from "frontity";
import LatoBlack from "../fonts/Lato/Lato-Black.ttf";
import LatoBlackItalic from "../fonts/Lato/Lato-BlackItalic.ttf";
import LatoBold from "../fonts/Lato/Lato-Bold.ttf";
import LatoBoldItalic from "../fonts/Lato/Lato-BoldItalic.ttf";
import LatoItalic from "../fonts/Lato/Lato-Italic.ttf";
import LatoLight from "../fonts/Lato/Lato-Light.ttf";
import LatoLightItalic from "../fonts/Lato/Lato-LightItalic.ttf"
import LatoRegular from "../fonts/Lato/Lato-Regular.ttf";
import LatoThin from "../fonts/Lato/Lato-Thin.ttf";
import LatoThinItalic from "../fonts/Lato/Lato-ThinItalic.ttf"

// const fonts = {
//   "us-ascii": [InterMediumUS, InterSemiBoldUS, InterBoldUS],
//   latin: [InterMediumLatin, InterSemiBoldLatin, InterBoldLatin],
//   all: [InterMedium, InterSemiBold, InterBold],
// };

const FontFace = ({ state }) => {
    
//   const font = fonts[state.theme.fontSets] || fonts["all"];

  return (
    <Global
      styles={css`
      
        @font-face {
          font-family: "Lato";
          font-style: normal;
          font-weight: 300;
          src: url(${LatoLight}) format("woff2");
          font-display: "swap";
        }
        @font-face {
          font-family: "Lato";
          font-style: normal;
          font-weight: 400;
          src: url(${LatoRegular}) format("woff2");
          font-display: "swap";
        }
        @font-face {
          font-family: "Lato";
          font-style: normal;
          font-weight: 700;
          src: url(${LatoBold}) format("woff2");
          font-display: "swap";
        }
      `}
    />
  );
};

export default connect(FontFace);