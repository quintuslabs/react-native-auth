import { StyleSheet } from 'react-native'
import colors from './colors'

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },


    loginContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        width: '100%'
    },
    loginArea: {
        width: '100%',
        padding: 5,
    },
    newAccountContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    normalText: {
        color: '#000000',
        fontSize: 14,
        alignItems: 'center',
        textAlign: 'center',
        padding: 5,
    },
    createText: {
        color: '#FF7260',
        fontSize: 14,
        alignItems: 'center',
        textAlign: 'center',
        padding: 5,
    },
    forgotText: {
        color: '#ffffff',
        fontSize: 14,
        alignItems: 'flex-end',
        textAlign: 'right',
        width: '100%',
        padding: 5,
    },
    logoContiner: {
        height: 200,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    welcome: {
        fontSize: 25,
        color: '#5B5A5A',
        letterSpacing: 6
    },
    textInput: {
        color: '#989899',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        margin: 5,
        marginLeft: 20,
    },
    button: {
        width: '100%',
        borderColor: '#129793',
        borderWidth: 1,
        height: 50,
        padding: 10,
        borderRadius: 24,
        marginTop: 20,
        backgroundColor: '#129793',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#129793',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 5,
        shadowOpacity: 0.8
    },
    buttonText: {
        color: 'white',
        fontSize: 12
    },
    nameContainer: {
        width: '100%',
        borderColor: '#CFD0D1',
        borderWidth: 1,
        height: 50,
        borderRadius: 25,
        marginBottom: 5,
        backgroundColor: '#F5F6F7'
    },

    mobileContainer: {
        width: '100%',
        borderColor: '#CFD0D1',
        borderWidth: 1,
        height: 50,
        borderRadius: 25,
        borderBottomWidth: 1,
        marginBottom: 5,
        backgroundColor: '#F5F6F7'
    },
    emailContainer: {
        width: '100%',
        borderColor: '#CFD0D1',
        borderWidth: 1,
        height: 50,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderBottomWidth: 1,
        backgroundColor: '#F5F6F7',
        marginBottom: 8,
    },
    passwordContainer: {
        width: '100%',
        borderColor: '#CFD0D1',
        borderWidth: 1,
        height: 50,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: '#F5F6F7'

    },
    scrollview: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        justifyContent: "space-between",
        padding: 10,
    },
})

export default style