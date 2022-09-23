import PastVisit from '../../pages/PastVisit/PastVisit';
import { wp, hp } from './Scalling';
const fontSize = {
    // mini: wp(2.5),
    // small: wp(3),
    // medium: wp(3.5),
    // xMedium: wp(3.8),
    // regular: wp(4),
    // xRegular: wp(4.5),
    // large: wp(5),
    // xLarge: wp(5.5),
    // xxLarge: wp(6.5),
    // xxxLarge: wp(7.5),



    headerTitle: wp(5),
    button: wp(4.7),


    mainScreen: {
        emptyDiscription: wp(4.5),
        calDate: wp(12)
    },
    historyScreen: {
        importantTextHeading: wp(3.8),
        pastVisitText: wp(3.5),
        appoinmentWith: wp(4.5)
    },
    pastVisitScreen: {
        pastVisitHeading: wp(5.5),
        passVisitDis: wp(4),
        date: wp(4.7),
        flatListItemHeading: wp(6),
        flatListItemDis: wp(4.25),
        viewNotes: wp(4),
        ago: wp(3)
    },
    NotesScreen: {
        Dis: wp(5)
    }
};

const fontFamily = {
    ProximaNovaAlt_Bold: 'Proxima Nova Alt Bold',
    ProximaNovaAlt_Light: 'Proxima Nova Alt Light',
    ProximaNovaAlt_Thin: 'Proxima Nova Alt Thin',
    ProximaNova_Black: 'Proxima Nova Black',
    ProximaNova_Bold: 'Proxima Nova Bold',
    ProximaNova_Extrabold: 'Proxima Nova Extrabold',
    ProximaNova_Thin: 'Proxima Nova Thin',
    ProximaNova_Regular: 'ProximaNova-Regular',
    ProximaNova_Medium: 'ProximaNova-Medium'
}

export { fontSize, fontFamily }