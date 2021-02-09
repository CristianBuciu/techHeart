// export const roundToTwo = (num) => {
//   return +(Math.round(num + "e+2") + "e-2");
// };

import { createMuiTheme } from "@material-ui/core/styles";

export const roundToTwo = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        display: "flex",
        alignItems: "center",
        lineHeight: "1",
        fontSize: "1.2rem",
        color: "#e5faf3",
        backgroundColor: "#4e4e4e",
      },
    },
  },
});
