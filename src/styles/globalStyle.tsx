import { StyleSheet } from "react-native";


const $lightColor = "rgba(0,0,0,0.2)";
const $bgColor = "rgb(233,234,238)"
const globaStyle = StyleSheet.create({
    contentPadding: { paddingHorizontal: 10, paddingVertical: 10, paddingTop: 20 },

    bgColor: { backgroundColor: $bgColor },
    themeColor: { color: "rgb(17,129,176)" },
    themeBgColor: { backgroundColor: "rgb(17,129,176)" },
    whiteText: { color: "white" },

    font12: { fontSize: 12 },
    font13: { fontSize: 13 },
    font14: { fontSize: 14 },
    font15: { fontSize: 15 },
    font16: { fontSize: 16 },
    font17: { fontSize: 17 },
    font18: { fontSize: 18 },
    font19: { fontSize: 19 },
    font20: { fontSize: 20 },
    font21: { fontSize: 21 },
    font22: { fontSize: 22 },
    font28: { fontSize: 28 },

    w100: { fontWeight: "100" },
    w200: { fontWeight: "200" },
    w300: { fontWeight: "300" },
    w400: { fontWeight: "400" },
    w500: { fontWeight: "500" },
    w600: { fontWeight: "600" },
    w700: { fontWeight: "700" },
    bold: { fontWeight: "bold" },


    alignItemsCenter: { alignItems: "center" },
    justifyContentCEnter: { justifyContent: "center" },
    flexRow: { flexDirection: "row" },
    justifyContentSpaceBetween: { justifyContent: "space-between" },

    positionRelative: { position: "relative" },
    positionAbsolute: { position: "absolute" },
    flex1: { flex: 1 },

    lightColor: { color: $lightColor },

    textCenter: { textAlign: "center" },

    marginTop10: { marginTop: 10 },
    marginTop20: { marginTop: 20 },
    marginTop30: { marginTop: 30 },
    marginTop40: { marginTop: 40 },
    marginTop50: { marginTop: 50 },


});

export default globaStyle;