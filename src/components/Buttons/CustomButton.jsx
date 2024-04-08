import Button from "@mui/material/Button";
import { COLORS } from "../../constants/colors";
import { Lexend } from "../../constants/font";

const CustomButton = ({ text, activeTab, tabName, setActiveTab, style }) => {
  return (
    <Button
      onClick={() => setActiveTab(tabName)}
      style={{
        backgroundColor: activeTab === tabName ? COLORS?.PrimaryBlue : COLORS?.GreyButton,
        color: activeTab === tabName ? 'white' : '#5D5F5F',
        fontWeight: activeTab === tabName ? 'bold' : 'normal',
        textTransform: 'capitalize',
        fontFamily: Lexend,
      }}
      variant='contained'
    >
      {text}
    </Button>
  );
};

export default CustomButton;
